const ProductDetailsPage = () => {
  const { slug } = useParams();
  const fetchProductDeatils = async (slug) => {
    try {
      const res = await fetch(`${baseURL}/products/${slug}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDeatils(slug);
  }, [slug]);

  return <div>ProductDetailsPage</div>;
};

export default ProductDetailsPage;
