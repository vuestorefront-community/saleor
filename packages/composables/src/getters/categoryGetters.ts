import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from '@vue-storefront/saleor-api';

export const getCategoryTree = (
  category: Category
): AgnosticCategoryTree | null => {
  const getRoot = (category: Category): Category =>
    category.parent ? getRoot(category.parent) : category;
  const buildTree = (rootCategory: Category) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
    id: rootCategory.id,
    isCurrent: rootCategory.id === category.id,
    items: rootCategory.children.edges.map((e) => {
      return buildTree(e.node);
    })
  });

  if (!category) {
    return null;
  }

  return buildTree(getRoot(category));
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree
};

export default categoryGetters;
