import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad', //default category 'Salad'
  });

  // Update the state based on the name of the input field
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const formData = new FormData() //insert all form data into One formdata
    formData.append('name', data.name) //insert all data..
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)
    const response = await axios.post(`${url}/api/food/add`,formData);

    if(response.data.success){
        setData({
            name: '',
            description: '',
            price: '',
            category: 'Salad', //default category 'Salad'
        })
        setImage(false)
        toast.success(response.data.message)
    }else{
        toast.error(response.data.message)
    }
  }
  

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here.."
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here.."
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Biriyani">Biriyani</option>
              <option value="Burger">Burger</option>
              <option value="Momos">Momos</option>
              <option value="Pizza">Pizza</option>
              <option value="Juice">Juice</option>
              <option value="Rice">Rice</option>
              <option value="Nonveg Items">Nonveg Items</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$10"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
};

export default Add;