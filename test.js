const data = {
  product_name: "thịt chó 1",
  image_url: "url",
  landing_page_url: "landing_page_url",
  category: "thit cho",
  price: 10000,
  status: 1,
  product_id: "1000",
  portal_id: 1,
};
console.log(data.toString())
console.log(Buffer(data.toString()))

console.log(Buffer(data.toString()).toString())

console.log(JSON.parse(Buffer(data.toString()).toString()))