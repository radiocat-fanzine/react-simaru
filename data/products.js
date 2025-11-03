const products = [
    {
        id: 1,
        title: 'Infinity Cork Backpack',
        imgURL: 'https://photos.app.goo.gl/UrcFYTRbw96x2Mve8',
        description: 'Water-repellent & robust: vegan cork and lightweight Oxford fabric. Additional zip compartment inside. Adjustable straps & cork carrying handle. Dimensions: 40 cm x 35 cm x 11 cm. Volume: up to 15 litres',
        price: 89.90,
        stock: 50,
        category: 'bags',
        material: 'cork'
    },
    {
        id: 2,
        title: 'Paco Cork Backpack',
        imgURL: 'https://photos.app.goo.gl/6To13r4qH7dE75ac7',
        description: 'Water-repellent & robust: vegan cork and lightweight Oxford fabric. 2 compartments inside & 2 compartments outside. Machine washable at 30 degrees. Dimensions: 41 cm x 30 cm x 12 cm. Volume: up to 14 litres',
        price: 129.90,
        stock: 50,
        category: 'bags',
        material: 'cork'
    },
    {
        id: 3,
        title: 'Maja Cork Wallet',
        imgURL: 'https://photos.app.goo.gl/jY9HCMjAumWWWEeQ6',
        description: '5+6 card slots for at least 11 cards. 2 compartments for notes and receipts. 2 zipped compartments for coins, etc. RFID protection. Dimensions when closed: 17 cm x 10 cm x 4 cm (LxWxH)',
        price: 64.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 4,
        title: 'Joel Cork Wallet',
        imgURL: 'https://photos.app.goo.gl/Ur4MGKh3g9mweFXW8',
        description: '7 card slots including flexible card slot with pull tab. 1 coin compartment. 1 compartment for notes & receipts. RFID protection. Dimensions: 10.2 cm x 8.5 cm x 1.5 cm (LxWxH)',
        price: 43.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 5,
        title: 'Maila Cork Wallet',
        imgURL: 'https://photos.app.goo.gl/WxKfwcgHq1sFB7hA9',
        description: '3 compartments for bills & receipts. Card slots for at least 10 cards. Extra zippered compartment on the outside. RFID protection. Dimensions when closed: 12cm x 9cm x 3cm (LxWxH)',
        price: 42.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 6,
        title: 'Maila Cork Wallet Black',
        imgURL: 'https://photos.app.goo.gl/CRegTvdnPaN6MdUL7',
        description: '3 compartments for bills & receipts. Card slots for at least 10 cards. Extra zippered compartment on the outside. RFID protection. Dimensions when closed: 12cm x 9cm x 3cm (LxWxH)',
        price: 42.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 7,
        title: 'Mael (Worldmap) Cork Wallet',
        imgURL: 'https://photos.app.goo.gl/CRegTvdnPaN6MdUL7',
        description: '8+6 card slots for at least 14 cards. 2 compartments for bills and receipts (1 with zipper). Coin compartment.RFID protection. Dimensions when closed: 10 cm x 13 cm x 2 cm (LxWxH)',
        price: 39.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 8,
        title: 'Yona Mini Cork Wallet',
        imgURL: 'https://photos.app.goo.gl/Dw5H5spevi93S15q7',
        description: 'Large main compartment & 2 compartments for notes & cards. 1 zippered compartment for coins. Snap closure with magnet. Vegan & durable cork. Dimensions when closed: 5.5in x 3.5in x 0.6in (LxWxH)',
        price: 34.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 9,
        title: 'Napoli Mini Cork Coin Purse',
        imgURL: 'https://photos.app.goo.gl/2iku7H3ts1sWcusr5',
        description: 'Large main compartment & 2 compartments for notes & cards. 1 zippered compartment for coins. Snap closure with magnet. Vegan & durable cork. Dimensions when closed: 5.5in x 3.5in x 0.6in (LxWxH)',
        price: 19.99,
        stock: 70,
        category: 'wallets',
        material: 'cork'
    },
    {
        id: 10,
        title: 'Beja Tobacco Pouch Gray',
        imgURL: 'https://photos.app.goo.gl/TNUstP2fmuyvMTJR7',
        description: 'Best Italian leather. Practical magnetic closure. Additional interchangeable closure straps. Paper holder for double packs. Extra compartment for filters. Dimensions: 16cm x 9cm x 2cm (WxHxD)Large main compartment & 2 compartments for notes & cards. 1 zippered compartment for coins. Snap closure with magnet. Vegan & durable cork. Dimensions when closed: 5.5in x 3.5in x 0.6in (LxWxH)',
        price: 29.99,
        stock: 60,
        category: 'tobacco pouches',
        material: 'leather'
    },
    {
        id: 11,
        title: 'Beja Tobacco Pouch Panama',
        imgURL: 'https://photos.app.goo.gl/6hKCd3cMERz6AnmZ9',
        description: 'Best Italian leather. Practical magnetic closure. Additional interchangeable closure straps. Paper holder for double packs. Extra compartment for filters. Dimensions: 16cm x 9cm x 2cm (WxHxD)Large main compartment & 2 compartments for notes & cards. 1 zippered compartment for coins. Snap closure with magnet. Vegan & durable cork. Dimensions when closed: 5.5in x 3.5in x 0.6in (LxWxH)',
        price: 29.99,
        stock: 60,
        category: 'tobacco pouches',
        material: 'leather'
    },
    {
        id: 12,
        title: 'Beja Tobacco Pouch Black',
        imgURL: 'https://photos.app.goo.gl/pXWQh8BSxz6u87C17',
        description: 'Best Italian leather. Practical magnetic closure. Additional interchangeable closure straps. Paper holder for double packs. Extra compartment for filters. Dimensions: 16cm x 9cm x 2cm (WxHxD)Large main compartment & 2 compartments for notes & cards. 1 zippered compartment for coins. Snap closure with magnet. Vegan & durable cork. Dimensions when closed: 5.5in x 3.5in x 0.6in (LxWxH)',
        price: 29.99,
        stock: 60,
        category: 'tobacco pouches',
        material: 'leather'
    },
    {
        id: 13,
        title: 'Beja Tobacco Pouch Brown',
        imgURL: 'https://photos.app.goo.gl/VtJt4eFAjRP565Uy5',
        description: 'Best Italian leather. Practical magnetic closure. Additional interchangeable closure straps. Paper holder for double packs. Extra compartment for filters. Dimensions: 16cm x 9cm x 2cm (WxHxD)Large main compartment & 2 compartments for notes & cards. 1 zippered compartment for coins. Snap closure with magnet. Vegan & durable cork. Dimensions when closed: 5.5in x 3.5in x 0.6in (LxWxH)',
        price: 29.99,
        stock: 60,
        category: 'tobacco pouches',
        material: 'leather'
    },
    {
        id: 14,
        title: 'Madeira Cork Tobacco Pouch',
        imgURL: 'https://photos.app.goo.gl/gfzaZyNYPhGJHEsc9',
        description: 'Zippered compartment for filters. Paper holder for double packs. Extra compartment for lighter. Practical closure strap. Compact & lightweight: 15.5cm x 8cm x 1cm - 40g',
        price: 35.99,
        stock: 60,
        category: 'tobacco pouches',
        material: 'cork'
    },
    {
        id: 15,
        title: 'Chimoio Leather Bracelet',
        imgURL: 'https://photos.app.goo.gl/V9EPrLTHXhSZznXT7',
        description: 'Wrap bracelet Made in Germany. Natural: Vegetable-tanned premium leather. Great feel: Skin-friendly & soft. Practical & secure: Stainless steel magnetic clasp with Simaru engraving in silver. Mix of colors & styles: Smooth brown & braided',
        price: 29.89,
        stock: 100,
        category: 'bracelets',
        material: 'leather'
    },
    {
        id: 16,
        title: 'Merano Leather Bracelet',
        imgURL: 'https://photos.app.goo.gl/Yv16i3LLdhKCtQRTA',
        description: 'Braided bracelet Made in Germany, Natural: Vegetable-tanned premium leather. Great feel: Skin-friendly & soft. Strong clasp: Sturdy screw rivet. Genuine leather 25mm wide & 2mm thick',
        price: 19.90,
        stock: 100,
        category: 'bracelets',
        material: 'leather'
    },
    {
        id: 17,
        title: 'Leather Bracelet with adjustable rivets',
        imgURL: 'https://photos.app.goo.gl/mSfQJuHqoWziY8qWA',
        description: 'Trap bracelet Made in Germany. 2 in 1: One strap with a longitudinal cut. Natural: Vegetable-tanned premium leather. Great feel: Skin-friendly & soft. Adjustable size: 2 screw-on rivets',
        price: 19.90,
        stock: 100,
        category: 'bracelets',
        material: 'leather'
    },
    {
        id: 18,
        title: 'Arequipa Leather Bracelet',
        imgURL: 'https://photos.app.goo.gl/sGVWAdPx1Qu5dHj58',
        description: 'Natural: Premium vegetable-tanned leather, Great feel: Skin-friendly & soft, Simple & secure: Stainless steel bayonet, Wrap bracelet: Simply wrap around your wrist. Elegant look: Black with decorative stitching',
        price: 19.90,
        stock: 100,
        category: 'bracelets',
        material: 'leather'
    },
    {
        id: 19,
        title: 'Curitiba Cork Belt',
        imgURL: 'https://photos.app.goo.gl/sGVWAdPx1Qu5dHj58',
        description: '100% vegan cork: Soft and comfortable for maximum wearability. Elegant shiny silver metal buckle. Tear- and water-resistant. Strap width: 2.5 cm. Buckle width: 3.2 cm.',
        price: 37.99,
        stock: 50,
        category: 'belts',
        material: 'cork'
    },
    {
        id: 20,
        title: 'Curitiba Cork Belt',
        imgURL: 'https://photos.app.goo.gl/sGVWAdPx1Qu5dHj58',
        description: '100% vegan cork: Soft and comfortable for maximum wearability. Stylish shiny gold metal buckle. Tear- and water-resistant. Strap width: 2.5 cm. Buckle width: 3.2 cm.',
        price: 37.99,
        stock: 50,
        category: 'belts',
        material: 'cork'
    },
];

export default products;