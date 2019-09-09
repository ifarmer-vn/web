const variantTypes = [
    {
    "_source": {
        "show_name": true,
        "url": "hang",
        "name": "",
        "children": {
            "dong-lanh": {"name": "Đông Lạnh", "order": "2"},
            "nha": {"name": "Nhà", "order": "1"},
            "nhap-khau": {"name": "Nhập Khẩu", "order": "4"},
            "organic": {"name": "Organic", "order": "0"},
            "song": {"name": "Sống", "order": "0"},
            "tuoi": {"name": "Tươi", "order": "1"},
            "xuat-khau": {"name": "Xuất Khẩu", "order": "3"}
        },
    }
}, {
    "_source": {
        "show_name": true,
        "url": "trong-luong",
        "name": "Trọng lượng",
        "order": 0,
        "children": {
            "1-kg": {"name": "1kg", "order": "5"},
            "100-g": {"name": "100g", "order": "0"},
            "2-kg": {"name": "2kg", "order": "6"},
            "200-g": {"name": "200g", "order": "1"},
            "250-g": {"name": "250g", "order": "2"},
            "3-kg": {"name": "3kg", "order": "7"},
            "300-g": {"name": "300g", "order": "3"},
            "4-kg": {"name": "4kg", "order": "8"},
            "5-kg": {"name": "5kg", "order": "9"},
            "500-g": {"name": "500g", "order": "4"}
        },
    }
}];
const relatedVariants = [
    {
    "_source": {
        "productSource": {"title": "Ba Khía", "url": "ba-khia"},
        "images": {"url": "https://storage.googleapis.com/ifarmer-vn/ecacbb9c156640caa9b8caf20e574e1d/ba-khia-hang-xuat-khau-trong-luong-5-kg.jpg"},
        "price": 307000,
        "extraTitle": "Xuất Khẩu Trọng lượng 5kg",
        "variantTypes": {"hang": "xuat-khau", "trong-luong": "5-kg"},
        "url": "ba-khia-hang-xuat-khau-trong-luong-5-kg"
    },
}, {
    "_source": {
        "productSource": {"title": "Ba Khía", "url": "ba-khia"},
        "images": {"url": "https://storage.googleapis.com/ifarmer-vn/d2c682ab0daa4bcd976109484e9a8c37/ba-khia-hang-xuat-khau-trong-luong-2-kg.jpg"},
        "price": 157000,
        "extraTitle": "Xuất Khẩu Trọng lượng 2kg",
        "variantTypes": {"hang": "xuat-khau", "trong-luong": "2-kg"},
        "url": "ba-khia-hang-xuat-khau-trong-luong-2-kg"
    },
}, {
    "_source": {
        "productSource": {"title": "Ba Khía", "url": "ba-khia"},
        "images": {"url": "https://storage.googleapis.com/ifarmer-vn/1a1502850b22428b8fa836e8726c851d/ba-khia-hang-song-trong-luong-2-kg.jpg"},
        "price": 158000,
        "extraTitle": "Sống Trọng lượng 2kg",
        "variantTypes": {"hang": "song", "trong-luong": "2-kg"},
        "url": "ba-khia-hang-song-trong-luong-2-kg"
    },
}, {
    "_source": {
        "productSource": {"title": "Ba Khía", "url": "ba-khia"},
        "images": {"url": "https://storage.googleapis.com/ifarmer-vn/83d8e993099049af9ba5636caf324241/ba-khia-hang-song-trong-luong-5-kg.jpg"},
        "price": 314000,
        "extraTitle": "Sống Trọng lượng 5kg",
        "variantTypes": {"hang": "song", "trong-luong": "5-kg"},
        "url": "ba-khia-hang-song-trong-luong-5-kg"
    },
}, {
    "_source": {
        "productSource": {"title": "Ba Khía", "url": "ba-khia"},
        "images": {"url": "https://storage.googleapis.com/ifarmer-vn/1d737f224c55403ba15841aef811f67b/ba-khia-hang-xuat-khau-trong-luong-1-kg.jpg"},
        "price": 78000,
        "extraTitle": "Xuất Khẩu Trọng lượng 1kg",
        "variantTypes": {"hang": "xuat-khau", "trong-luong": "1-kg"},
        "url": "ba-khia-hang-xuat-khau-trong-luong-1-kg"
    },
}, {
    "_source": {
        "productSource": {"title": "Ba Khía", "url": "ba-khia"},
        "images": {"url": "https://storage.googleapis.com/ifarmer-vn/3eab59540882460fa8ce99ee6b3cafa5/ba-khia-hang-song-trong-luong-1-kg.jpg"},
        "price": 80000,
        "extraTitle": "1 kg",
        "variantTypes": {"hang": "song", "trong-luong": "1-kg"},
        "url": "ba-khia-hang-song-trong-luong-1-kg"
    },
}];
const composeData = require("./composeData");

describe("composeData", () => {
    describe("buildVariantGroups", () => {
        fit("should return correct data 1", () => {
            console.time("test");
            const output = composeData.buildVariantGroups(relatedVariants, variantTypes);
            console.timeEnd("test");
            console.log(JSON.stringify(output));
            const expected = [];
            expect().toEqual(output);
        });
    });
});
