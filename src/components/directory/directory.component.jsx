import CategoryItem from "../category_item/category_item.component";

import "./directory.styles.scss";
const Directory = ({ categories }) => {
  return (
    <div className="directory_container">
      {/* LOOPING THROUGH CATEGORIES ARRAY */}
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
