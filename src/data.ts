import { MenuCategory, Outlet } from "./types";

export const menuData: Record<string, MenuCategory> = {
  hotsips: {
    title: "Chai & Hot Coffee",
    sections: [
      {
        title: "Chai Chaloge?",
        items: [
          { name: "Regular Chai", price: "20 / 30 / 40", description: "Our timeless house blend, brewed daily with balanced milk & sugar.", popular: true },
          { name: "Kadak Chai", price: "20 / 30 / 40", description: "Extra strong black tea leaves brewed to perfection of strength." },
          { name: "Adrak Chai", price: "25 / 35 / 45", description: "Infused with freshly crushed local ginger root for that warm throat relief.", popular: true },
          { name: "Chaiholic Special", price: "25 / 35 / 45", description: "The legendary blend, made with a secret recipe of 5 aromatic spices.", popular: true },
          { name: "Masala Chai", price: "25 / 35 / 45", description: "A heartwarming selection infused with cardamom, clove, and cinnamon." },
          { name: "Elaichi Chai", price: "25 / 35 / 45", description: "Delicate and sweet fragrance of freshly ground green cardamom pod." },
          { name: "Chocolate Chai", price: "25 / 40 / 50", description: "The luxury match of premium dark cocoa powder and rich boiled tea." },
          { name: "Badam Chai", price: "45 / 55", description: "Enriched with crushed California almonds and saffron flakes." },
          { name: "Kesar Chai", price: "45 / 55", description: "Royal luxury chai brewed with original premium Kashmiri Kesar.", popular: true }
        ]
      },
      {
        title: "Kaafi Hot Coffee",
        items: [
          { name: "Hot Coffee", price: "30 / 45 / 55", description: "Steamy espresso-frothed hot coffee made traditional Indian style." },
          { name: "Chocolate Coffee", price: "35 / 50 / 60", description: "Frothed espresso combined with rich chocolate cream layers." },
          { name: "Caramel Hot Coffee", price: "35 / 55 / 65", description: "Drizzled with authentic artisanal sweet liquid caramel syrup." },
          { name: "Irish Hot Coffee", price: "35 / 55 / 65", description: "Non-alcoholic whiskey-flavored hot brew with frothed cream." }
        ]
      }
    ]
  },
  coldsips: {
    title: "Cold Coffee & Shakes",
    sections: [
      {
        title: "Bhayankar Thandi Cold Coffee",
        items: [
          { name: "Cold Coffee", price: "67", description: "Our crowd favorite classic blended cold coffee, served rich and frothy.", popular: true },
          { name: "Chocolate Coffee", price: "75", description: "Perfect cold blend balanced with luxurious liquid chocolate swirl." },
          { name: "Ice Cream Coffee", price: "85", description: "Thick iced coffee crowned with a generous scoop of vanilla ice cream.", popular: true },
          { name: "Caramel Coffee", price: "89", description: "Creamy iced coffee infused with gold standard caramel drizzle." },
          { name: "Hazelnut Coffee", price: "89", description: "Roasted nutty hazelnut notes coupled with rich thick coffee syrup." },
          { name: "Irish Coffee", price: "89", description: "Our signature cold coffee blended with rich non-alcoholic Irish cream." }
        ]
      },
      {
        title: "Shake Your Milkshake",
        items: [
          { name: "Vanilla / Strawberry Shake", price: "80 / 85", description: "Classic velvety shakes blended with real premium fruit syrup or bean extract." },
          { name: "Butterscotch / Blackcurrant Shake", price: "90", description: "Crunchy butterscotch bits / deep exotic sweet blackcurrant." },
          { name: "Crunchy Oreo / Blueberry Shake", price: "99", description: "Whipped milk shake loaded with real crushed oreos / organic blueberry.", popular: true },
          { name: "Bubblegum / Kitkat Shake", price: "99 / 119", description: "Fun retro pop bubblegum / chunky chocolate kitkat crispy shake." },
          { name: "Brownie / Banana Caramel Shake", price: "119 / 129", description: "Fudgy chocolate brownie crumble / fresh ripe banana and gold caramel." },
          { name: "Blueberry Cheesecake Shake", price: "129", description: "Exquisite shake crafted to taste exactly like a fresh New York cream cake.", popular: true }
        ]
      },
      {
        title: "Mojito Nahi Moito",
        items: [
          { name: "Mint Mojito", price: "67", description: "The ultimate hot-day defense: freshly muddled mint, lime, and cold soda." },
          { name: "Blue Lagoon / Passion Fruit", price: "79 / 85", description: "Vibrant ocean-hued citrus mocktail / sweet tropical pulp splash." },
          { name: "Passion Ice Tea / Blueberry Ice Tea", price: "89", description: "Chilled house-brewed black tea infused with natural fruit nectars." },
          { name: "Green Apple / Watermelon Mocktail", price: "89 / 99", description: "Crisp tart green apple sour / juicy summery cold refreshing drink." },
          { name: "Guava Madness / Berry Blast", price: "99", description: "Spicy guava tang with a chili rim / loaded field berry fusion." }
        ]
      }
    ]
  },
  fastfood: {
    title: "Burgers & Wraps",
    sections: [
      {
        title: "Burger Nahi Burgirr",
        items: [
          { name: "Classic Patty Burger", price: "55", description: "Crispy vegetable deep-fry patty with mayonnaise and onion rings." },
          { name: "Veggie Grill Burger", price: "65", description: "Flame-grilled spiced herb patty topped with house special burger sauce." },
          { name: "Paneer Tikka / Makhni Burger", price: "99", description: "Succulent cottage cheese block dunked in sweet royal butter gravy.", popular: true },
          { name: "Chaiholic Special Burger", price: "109", description: "Two layered extra crispy patties, liquid cheddar cheese, and custom pickles.", popular: true },
          { name: "Cheese Slice Add-on", price: "20" }
        ]
      },
      {
        title: "Mere Dil-Wich Sandwich",
        items: [
          { name: "Veg Basic (White / Brown Bread)", price: "85 / 95", description: "Finely chopped fresh garden cucumbers, tomatoes, and seasoned mint spread." },
          { name: "Tandoori (White / Brown Bread)", price: "100 / 110", description: "Smoky spicy tandoori mayonnaise infused filling, toasted on griddle." },
          { name: "Cheese Corn (White / Brown Bread)", price: "120 / 130", description: "Sweet golden American corn kernels drenched in liquid hot mozzarella cheese.", popular: true },
          { name: "Paneer / Tandoori Paneer", price: "130 / 140", description: "Tender seasoned paneer cubes grilled crispy with bell peppers." },
          { name: "Paneer Cheese / Club Sandwich", price: "140 / 170", description: "Double decker loaded sandwich stuffed with veggies, paneer, and rich cheese levels.", popular: true }
        ]
      },
      {
        title: "Wraps & Subs",
        items: [
          { name: "Veggie Wrap", price: "109", description: "Warm toasted tortilla wrapping healthy mixed seasoned greens and herbs." },
          { name: "Paneer Tikka Wrap", price: "129", description: "Baked clay oven tandoori paneer wraps with shredded cabbage slaw." },
          { name: "Aloo Tikki Sub", price: "149", description: "6-inch fresh baked bread loaded with potato wedges, fresh dynamic olives and sauces." },
          { name: "Paneer Tikka Sub", price: "159", description: "Classic spicy sub filled with smoky paneer chunks and multiple sauce flows." }
        ]
      }
    ]
  },
  italian: {
    title: "Pizza & Pasta",
    sections: [
      {
        title: "La Pizza La",
        items: [
          { name: "Single Veggie Pizza (Regular)", price: "89", description: "Freshly baked personal thin dough crust with customized onion or sweetcorn topping." },
          { name: "Veggie Pizza (Reg/Med/Lrg)", price: "110 / 160 / 240", description: "Loaded with capsicum, onion, gold sweetcorn and sun-riped tomatoes." },
          { name: "Margharita (Reg/Med/Lrg)", price: "119 / 160 / 260", description: "Simplicity at its best: our rich house seasoned tomato sauce and double cheese.", popular: true },
          { name: "Farmhouse Pizza (Reg/Med/Lrg)", price: "130 / 190 / 299", description: "Rustic country style pizza topped with mushrooms, capsicum, tomatoes and red jalapeno." },
          { name: "Makhni / Tandoori Paneer Pizza", price: "135 / 190 / 320", description: "Traditional sweet buttery tomato sauce or robust tandoor cooked paneer cubes.", popular: true },
          { name: "Sandwich Pizza", price: "170", description: "Innovative crisp pizza crust sandwich concept packed with cheeses and herbs." },
          { name: "Veg Loaded Pizza (Reg/Med/Lrg)", price: "150 / 220 / 350", description: "Overloaded with every single crop from the local farm - premium heavy cheese crust.", popular: true }
        ]
      },
      {
        title: "Jab Tu Mere Pasta",
        items: [
          { name: "Red Sauce Pasta", price: "125", description: "Penne pasta rolled in tangy hot garlic tomato marinara, spiked with oregano." },
          { name: "White Sauce Pasta", price: "130", description: "Creamy classic Italian white cheese sauce - extremely soft and rich flavor." },
          { name: "Mix Sauce Pasta", price: "140", description: "The perfect pink balance: tangy red and creamy rich white sauce unified.", popular: true },
          { name: "Makhni Sauce Pasta", price: "149", description: "Fusion pasta simmered in rich creamy Indian makhni gravy with cardamoms." },
          { name: "Cheese Mix / Tandoori Paneer Pasta", price: "159", description: "Mouth-watering luxury baked gold crusted pasta with tandoori elements." }
        ]
      },
      {
        title: "Garlic Bread",
        items: [
          { name: "Garlic Bread Stick", price: "89", description: "Four fresh-baked pull-apart breadsticks loaded with herb-infused butter." },
          { name: "Cheese Stuffed Garlic Bread", price: "129", description: "Stuffed inside with gooey melted mozzarella cheese and sweet corn bits.", popular: true },
          { name: "Special Paneer Tikka Garlic Bread", price: "139", description: "Topped with tiny hot paneer tikka crisps, oregano, and coriander dust." }
        ]
      }
    ]
  },
  snacks: {
    title: "Desi Snacks",
    sections: [
      {
        title: "Tu Kya Legi Maggi",
        items: [
          { name: "Maggi Masala / Veggie", price: "59 / 69", description: "The classic college-days warm bowl of spicy instant noodles / loaded with veggies." },
          { name: "Sweetcorn / Paneer Maggi", price: "79 / 89", description: "Sweet American corn kernels / fresh cottage cheese cubes added to our spicy stock." },
          { name: "Tandoori / Cheese Maggi", price: "89", description: "Coated with dynamic smokey tandoori mayo or topped with golden cheese sauce.", popular: true },
          { name: "Tandoori Paneer Maggi", price: "99", description: "Sizzling skillet cooked paneer combined with maggi masala." },
          { name: "Special Maggi", price: "109", description: "House masterpiece loaded with exotic butter, secret spice oils, and heavy cheese grate.", popular: true }
        ]
      },
      {
        title: "Fries Before Guys",
        items: [
          { name: "Salted Fries", price: "79", description: "Classic golden cut potato wedges, double fried for maximum crunch." },
          { name: "Masala / Peri Peri Fries", price: "99", description: "Dusted with hot South African peri-peri chili mix or tangy chaat spice.", popular: true },
          { name: "Cheesy / Yum Yum Fries", price: "109", description: "Drowned under thick liquid warm cheddar cheese sauce." }
        ]
      },
      {
        title: "China Ka Maal (Momos)",
        items: [
          { name: "Veg Steam / Fried", price: "110 / 120", description: "Delicate wrapper dumplings packed with minced cabbage and paneer." },
          { name: "Paneer Steam / Fried", price: "120 / 130", description: "Stuffed exclusively with seasoned local pan-warmed shredded cottage cheese.", popular: true },
          { name: "Veg Spring Roll", price: "120", description: "Crunchy deep fried golden rolls served with sweet & spicy hot garlic dip." }
        ]
      },
      {
        title: "Love Bites",
        items: [
          { name: "Bun Maska", price: "30", description: "Freshly sliced locally baked milk buns packed with cold Amul butter chunk.", popular: true },
          { name: "Bhujia Bun / Choco Bun", price: "35 / 40", description: "Toasted sweet bread with crisp spicy sev bhujia or oozing hot Nutella." },
          { name: "Poha", price: "70", description: "Flattened beaten rice flakes tempered with curry leaves, peanuts and lemon." },
          { name: "Cheese Loaded Nachos", price: "120", description: "Crisp dynamic tortilla chips loaded with tomato salsa, jalapeños, and hot cheese." }
        ]
      }
    ]
  },
  desserts: {
    title: "Kuch Meetha Ho Jaye",
    sections: [
      {
        title: "Sweet Cravings",
        items: [
          { name: "Hot Brownie with Chocolate Scoop", price: "79", description: "Warm rich cocoa cake topped with bubbling hot chocolate fudge.", popular: true },
          { name: "Oreo Dessert Cup", price: "99", description: "Layers of sweet vanilla cold custard, whipped milk, and real crushed Oreo biscuit." },
          { name: "Tinde Ya Sundae", price: "129", description: "A high-end dessert featuring three premium scoops of cream, nuts and jellies." },
          { name: "Chocolate Special Chai", price: "40", description: "A sweet hot tea boiled with dark cocoa paste and real sweet chocolate bits.", popular: true }
        ]
      }
    ]
  }
};

export const outlets: Outlet[] = [
  {
    name: "Rohtak (Flagship Outlet)",
    address: "Model Town, Vidya Niketan School Road (Opposite Raymond Store), Rohtak, Haryana",
    lat: 28.8955,
    lon: 76.6066,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Rohtak+Model+Town"
  },
  {
    name: "Panipat Outlet",
    address: "Huda Sector 11 Market (near Ahuja Sweets), Panipat, Haryana",
    lat: 29.3909,
    lon: 76.9635,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Panipat+Sector+11"
  },
  {
    name: "Sonipat Outlet",
    address: "Shop No. 1726, New Housing Board Colony, Sector 14, Sonipat, Haryana",
    lat: 28.9931,
    lon: 77.0151,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Sonipat+Sector+14"
  },
  {
    name: "Karnal Outlet",
    address: "Shop No. 646, Main Road, Sector 13 (Near Matka Chowk), Karnal, Haryana",
    lat: 29.6857,
    lon: 76.9905,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Karnal+Sector+13"
  },
  {
    name: "Hisar Outlet",
    address: "Red Square Market (Near Miraj Cinema), Hisar, Haryana",
    lat: 29.1492,
    lon: 75.7217,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Hisar+Red+Square+Market"
  },
  {
    name: "Gurgaon Cyber-Hub Outlet",
    address: "Basement Market, DLF City Phase 3, Gurgaon, Haryana",
    lat: 28.4595,
    lon: 77.0266,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Gurgaon+DLF+Phase+3"
  },
  {
    name: "Bhiwani City Center",
    address: "SCO-4, HUDA (Huda City Centre, Near Basia Bhawan), Bhiwani, Haryana",
    lat: 28.7830,
    lon: 76.1319,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Bhiwani+Huda+City+Centre"
  },
  {
    name: "Yamunanagar Outlet",
    address: "No. 238r, Malvika Market, Model Town, Yamunanagar, Haryana",
    lat: 30.1290,
    lon: 77.2674,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Yamunanagar+Model+Town"
  },
  {
    name: "Kurukshetra University Hub",
    address: "SCO 2, DD Complex (Opposite New Bus Stand), Kurukshetra, Haryana",
    lat: 29.9695,
    lon: 76.8783,
    state: "Haryana",
    phone: "+91 8395989816",
    mapsQuery: "Chaiholic+Kurukshetra+DD+Complex"
  },
  {
    name: "Kanpur Kakadeo Outlet",
    address: "117/72, Avon Market, Ambedkar Nagar, Kakadeo, Kanpur, Uttar Pradesh",
    lat: 26.4499,
    lon: 80.3319,
    state: "Uttar Pradesh",
    phone: "+91 8516000008",
    mapsQuery: "Chaiholic+Kanpur+Kakadeo"
  },
  {
    name: "Lucknow Crown Mall",
    address: "Unit 11, 2nd Floor, Crown Mall, Chiloki, Ayodhya Road, Lucknow, Uttar Pradesh",
    lat: 26.8467,
    lon: 80.9462,
    state: "Uttar Pradesh",
    phone: "+91 8516000008",
    mapsQuery: "Chaiholic+Lucknow+Crown+Mall"
  }
];

export const reviews = [
  {
    name: "Aditya Sharma",
    role: "Regular Chaiholic",
    comment: "The Chaiholic Special is purely sensational. Spiced exactly how my mother brew it at home but served in a luxury, modern setting. My daily office stress dissolves right after the first hot sip!",
    rating: 5,
    date: "May 2026"
  },
  {
    name: "Sneha Gupta",
    role: "Food Blogger",
    comment: "Simply the best cafe chain in Haryana. Their Bun Maska paired with rich Hazelnut Cold Coffee is unmatched. It's pocket-friendly and looks like a boutique luxury lounge. A absolute masterpiece!",
    rating: 5,
    date: "April 2026"
  },
  {
    name: "Rohan Verma",
    role: "Tech Professional",
    comment: "I've visited their Gurgaon Phase 3 outlet over 10 times. Consistent flavour, incredible speed and absolute clean environment. The WhatsApp franchise form is also extremely easyly managed.",
    rating: 5,
    date: "May 2026"
  }
];

export const signatureChais = [
  {
    id: "kesar",
    name: "Royal Kashmiri Kesar Chai",
    price: "₹45",
    flavorNotes: "Rich Saffron, Raw Honey, Creamy Milk",
    description: "Our signature crown jewel, brewed slowly with original handpicked Kashmiri Kesar saffron threads, cardamom pods, and organic gold milk. Served in a custom earthen kulhad with roasted almond sprinkles.",
    tag: "Royal Luxury"
  },
  {
    id: "special",
    name: "Chaiholic five-Spice Blend",
    price: "₹25",
    flavorNotes: "Green Cardamom, Caper Clove, Ginger Dust",
    description: "The blend that started it all. Rishabh's secret five-spice combination brewed for precisely 12 minutes to draw out robust natural plant extracts. Perfectly balanced sweet-spicy wellness magic.",
    tag: "All-Time Best Seller"
  },
  {
    id: "chocolate",
    name: "Artisanal Cocoa Chocolate Chai",
    price: "₹40",
    flavorNotes: "Ghanian Cocoa, Cardamom, Sweet Cream",
    description: "An incredible fusion of gourmet hot chocolate and strong Indian tea leaves. Premium boiled Ghanian black cocoa meets spiced sweet milk. Absolute dessert in a warm cup.",
    tag: "Chaiholic Innovation"
  }
];
