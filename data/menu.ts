export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'kebab' | 'biryani' | 'curry' | 'dessert' | 'lunch';
  image: string;
  tags: string[];
  spiceLevel: number; // 0 to 3
}

export const menuItems: MenuItem[] = [
  // Biryani
  {
    id: "biryani_001",
    name: "Mutton Dum Biryani",
    description: "Long grain basmati rice layered with tender mutton chunks and aromatic secret spices, cooked on dum.",
    price: 950,
    category: "biryani",
    image: "/images/biryani_001.webp",
    tags: ["Halal", "Best Seller"],
    spiceLevel: 2
  },
  {
    id: "biryani_002",
    name: "Kareem's Royal Biryani",
    description: "Chef's signature biryani pot layered with premium saffron rice and spiced marinated mutton.",
    price: 990,
    category: "biryani",
    image: "/images/biryani_002.webp",
    tags: ["Halal", "Signature"],
    spiceLevel: 2
  },
  {
    id: "biryani_003",
    name: "Mughlai Chicken Biryani",
    description: "Traditional fragrant rice with layers of spiced chicken, saffron, and fried onions.",
    price: 850,
    category: "biryani",
    image: "/images/biryani_003.webp",
    tags: ["Halal"],
    spiceLevel: 2
  },
  {
    id: "biryani_004",
    name: "Shahi Egg Biryani",
    description: "Fragrant basmati rice cooked with spice-infused boiled eggs, caramelized onions, and fresh herbs.",
    price: 750,
    category: "biryani",
    image: "/images/biryani_004.webp",
    tags: ["Vegetarian", "Egg"],
    spiceLevel: 1
  },
  {
    id: "biryani_005",
    name: "Hyderabadi Dum Biryani",
    description: "Extra spicy, authentic Hyderabadi mutton biryani slow-cooked with fresh mint and yogurt marinade.",
    price: 980,
    category: "biryani",
    image: "/images/biryani_005.webp",
    tags: ["Halal", "Spicy"],
    spiceLevel: 3
  },
  {
    id: "biryani_006",
    name: "Kareem's Special Beef Biryani",
    description: "Succulent beef cubes slow-cooked in traditional Mughlai spices and layered with long grain basmati rice.",
    price: 920,
    category: "biryani",
    image: "/images/biryani_006.webp",
    tags: ["Halal"],
    spiceLevel: 2
  },

  // Kebabs
  {
    id: "kebab_001",
    name: "Peshawari Chapli Kebab",
    description: "Pan-fried flat minced meat patties infused with traditional herbs, crushed pomegranate seeds, and fresh tomato.",
    price: 690,
    category: "kebab",
    image: "/images/kebab_001.webp",
    tags: ["Halal", "Popular"],
    spiceLevel: 2
  },
  {
    id: "kebab_002",
    name: "Winter Fantasy Kebab Platter",
    description: "A rich mix of chicken tandoori, tikka kebabs, and green kebabs, perfect for sharing.",
    price: 1200,
    category: "kebab",
    image: "/images/kebab_002.webp",
    tags: ["Halal", "Shareable"],
    spiceLevel: 2
  },
  {
    id: "kebab_003",
    name: "Chicken Tangdi Kulfi Kebab",
    description: "Juicy chicken drumsticks marinated in rich cream, cashew paste, and white spices, tandoor-roasted.",
    price: 720,
    category: "kebab",
    image: "/images/kebab_003.webp",
    tags: ["Halal", "Creamy"],
    spiceLevel: 1
  },
  {
    id: "kebab_004",
    name: "Premium Kebab Platter",
    description: "Royal assortment of green haryali, cream-based malai, and classic red tikka kebabs.",
    price: 1490,
    category: "kebab",
    image: "/images/kebab_004.webp",
    tags: ["Halal", "Signature"],
    spiceLevel: 2
  },
  {
    id: "kebab_005",
    name: "Chicken Nizami Tikka",
    description: "Tender boneless chicken pieces marinated in saffron, Greek yogurt, and royal spices, chargrilled.",
    price: 670,
    category: "kebab",
    image: "/images/kebab_005.webp",
    tags: ["Halal"],
    spiceLevel: 2
  },
  {
    id: "kebab_006",
    name: "Special Chicken Tandoori",
    description: "Classic bone-in chicken marinated in yogurt and tandoori spices, charcoal-grilled to juicy perfection.",
    price: 750,
    category: "kebab",
    image: "/images/kebab_006.webp",
    tags: ["Halal", "Classic"],
    spiceLevel: 2
  },
  {
    id: "kebab_007",
    name: "Galouti Kebab Patties",
    description: "Mouth-melting minced mutton patties mixed with papaya paste and aromatic ground spices.",
    price: 790,
    category: "kebab",
    image: "/images/kebab_007.webp",
    tags: ["Halal", "Melt-in-Mouth"],
    spiceLevel: 2
  },
  {
    id: "kebab_008",
    name: "Chicken Malai Tikka",
    description: "Rich boneless chicken kebabs marinated in heavy cream, cheese, and cardamom.",
    price: 720,
    category: "kebab",
    image: "/images/kebab_008.webp",
    tags: ["Halal", "Creamy"],
    spiceLevel: 1
  },
  {
    id: "kebab_009",
    name: "Tandoori Fish Tikka",
    description: "Fresh fish chunks marinated in carom seeds, yogurt, and yellow spices, skewered in tandoor.",
    price: 850,
    category: "kebab",
    image: "/images/kebab_009.webp",
    tags: ["Halal", "Seafood"],
    spiceLevel: 2
  },
  {
    id: "kebab_010",
    name: "Malai Paneer Tikka",
    description: "Soft cottage cheese chunks marinated in cream, cardamom, cashew paste, and white pepper, grilled.",
    price: 650,
    category: "kebab",
    image: "/images/kebab_010.webp",
    tags: ["Vegetarian"],
    spiceLevel: 1
  },
  {
    id: "kebab_011",
    name: "Tandoori Grilled Prawns",
    description: "Jumbo tiger prawns marinated in lemon, garlic, and red tandoori masala, chargrilled.",
    price: 950,
    category: "kebab",
    image: "/images/kebab_011.webp",
    tags: ["Seafood", "Spicy"],
    spiceLevel: 3
  },
  {
    id: "kebab_012",
    name: "Cheese-Stuffed Chicken Kebab",
    description: "Spiced minced chicken kebabs filled with gooey mozzarella cheese, cooked over fire.",
    price: 770,
    category: "kebab",
    image: "/images/kebab_012.webp",
    tags: ["Halal"],
    spiceLevel: 1
  },

  // Curry
  {
    id: "curry_001",
    name: "Kareem's Nalli Nihari",
    description: "Our signature slow-cooked mutton shank in a rich, deeply spiced bone-marrow gravy.",
    price: 890,
    category: "curry",
    image: "/images/curry_001.webp",
    tags: ["Halal", "Signature"],
    spiceLevel: 2
  },
  {
    id: "curry_002",
    name: "Royal Butter Chicken",
    description: "Tender tandoori chicken chunks simmered in a creamy, buttery tomato sauce flavored with fenugreek.",
    price: 790,
    category: "curry",
    image: "/images/curry_002.webp",
    tags: ["Halal", "Creamy", "Classic"],
    spiceLevel: 1
  },
  {
    id: "curry_003",
    name: "Mutton Ghee Roast",
    description: "Rich dry mutton roast tossed with freshly roasted spices and loaded with pure cow ghee.",
    price: 850,
    category: "curry",
    image: "/images/curry_003.webp",
    tags: ["Halal", "Spicy"],
    spiceLevel: 3
  },
  {
    id: "curry_005",
    name: "Murgh Mussalam",
    description: "Rich traditional Mughlai chicken curry served with boiled eggs and saffron-infused gravy.",
    price: 950,
    category: "curry",
    image: "/images/curry_005.webp",
    tags: ["Halal"],
    spiceLevel: 2
  },
  {
    id: "curry_006",
    name: "Creamy Chicken Shahi Korma",
    description: "Mild boneless chicken curry basted in rich cashew nut paste, yogurt, and cardamom.",
    price: 770,
    category: "curry",
    image: "/images/curry_006.webp",
    tags: ["Halal", "Creamy"],
    spiceLevel: 1
  },
  {
    id: "curry_009",
    name: "Mutton Karachi Wok",
    description: "Stir-fried bone-in mutton prepared in a traditional iron wok with fresh ginger, green chilies, and black pepper.",
    price: 890,
    category: "curry",
    image: "/images/curry_009.webp",
    tags: ["Halal"],
    spiceLevel: 2
  },
  {
    id: "curry_011",
    name: "Paneer Butter Masala",
    description: "Cubes of fresh cottage cheese simmered in an aromatic, rich, sweet tomato and cashew cream gravy.",
    price: 690,
    category: "curry",
    image: "/images/curry_011.webp",
    tags: ["Vegetarian", "Creamy"],
    spiceLevel: 1
  },
  {
    id: "curry_014",
    name: "Daal Makhani",
    description: "Black lentils slow-cooked overnight with double cream, fresh butter, and fire-charred garlic.",
    price: 590,
    category: "curry",
    image: "/images/curry_014.webp",
    tags: ["Vegetarian", "Creamy"],
    spiceLevel: 1
  },

  // Dessert
  {
    id: "dessert_001",
    name: "Royal Kulfi Ice Cream",
    description: "Rich traditional Mughlai condensed milk ice cream flavored with saffron, pistachios, and almonds.",
    price: 350,
    category: "dessert",
    image: "/images/dessert.webp",
    tags: ["Vegetarian", "Sweet"],
    spiceLevel: 0
  },
  // Lunch Sets
  {
    id: "lunch_001",
    name: "Vuna Khichuri Set",
    description: "Yellow lentil-infused basmati rice served with a boiled egg, spiced chicken curry, and fresh garden salad.",
    price: 300,
    category: "lunch",
    image: "/images/banner_009.webp",
    tags: ["Halal", "Lunch Special"],
    spiceLevel: 2
  },
  {
    id: "lunch_002",
    name: "Mutton Tehari Set",
    description: "Traditional mustard oil tehari rice layered with spiced mutton chunks, egg, and fresh salad.",
    price: 350,
    category: "lunch",
    image: "/images/banner_009.webp",
    tags: ["Halal", "Lunch Special", "Best Seller"],
    spiceLevel: 2
  },
  {
    id: "lunch_003",
    name: "Mutton Biryani Set",
    description: "Fragrant basmati rice mutton biryani served with a boiled egg, traditional roasted potato, and fresh salad.",
    price: 400,
    category: "lunch",
    image: "/images/banner_009.webp",
    tags: ["Halal", "Lunch Special", "Royal Set"],
    spiceLevel: 2
  },
  {
    id: "lunch_004",
    name: "Special Lunch Box",
    description: "Royal lunch selection featuring plain basmati rice, tandoori tikka kebab, rich butter curry, thick daal, and salad.",
    price: 500,
    category: "lunch",
    image: "/images/banner_009.webp",
    tags: ["Halal", "Lunch Special", "Chef Choice"],
    spiceLevel: 1
  }
];
