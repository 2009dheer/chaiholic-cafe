export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  popular?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuCategory {
  title: string;
  sections: MenuSection[];
}

export interface Outlet {
  name: string;
  address: string;
  lat: number;
  lon: number;
  state: string;
  phone?: string;
  mapsQuery?: string;
}

export interface UserStats {
  coins: number;
  orders: number;
  tier: string;
  memberSince: string;
}
