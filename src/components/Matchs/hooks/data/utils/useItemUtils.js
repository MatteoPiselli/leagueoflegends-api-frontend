export const useItemUtils = (itemsData) => {
  const getItemData = (itemId) => {
    return itemsData[itemId] || null;
  };

  return {
    getItemData,
  };
};
