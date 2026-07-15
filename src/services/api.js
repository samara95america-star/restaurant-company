import { menuData } from '../data/menu';
import { reviewsData, galleryData } from '../data/mock';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Menu
  getMenu: async () => {
    await delay(600);
    return menuData;
  },
  getMenuItem: async (id) => {
    await delay(400);
    const item = menuData.find(m => m.id === id);
    if (!item) throw new Error('Menu item not found');
    return item;
  },

  // Reservations
  createReservation: async (_data) => {
    await delay(1200);
    // Mock success response
    return {
      success: true,
      confirmationCode: `BV-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Reservation confirmed.'
    };
  },

  // Orders
  submitOrder: async (_orderData) => {
    await delay(1500);
    return {
      success: true,
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      estimatedTime: '45 mins'
    };
  },

  // Contact/Inquiries
  submitInquiry: async (_data) => {
    await delay(1000);
    return { success: true };
  },

  // Reviews & Gallery
  getReviews: async () => {
    await delay(500);
    return reviewsData;
  },
  getGallery: async () => {
    await delay(500);
    return galleryData;
  }
};
