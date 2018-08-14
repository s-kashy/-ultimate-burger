import React, { Component } from "react";
import Aux from "../../Hoc/Hoc";
import Modal from "../../Component/UI/Modal/Modal";
import Burger from "../../Component/Burger/Burger";
import BuildContrals from "../../Component/BuildContrals/BuildContrals";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../Component/Spinner/Spinner";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
      loading: false,
      priceOfBurger: 4,
      purchasable: false,
      purchasing: false
    };
  }
  //to update
  componentDidMount() {
    axios
      .get("/ingredients.json ")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {});
    // let ingredientsTemp = {
    //   bacon: 0,
    //   cheese: 0,
    //   salad: 0,
    //   meat: 0
    // };
    // this.setState({ ingredients: ingredientsTemp });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    let priceAddition = INGREDIENT_PRICES[type];
    let oldPrice = this.state.priceOfBurger;
    let temp = oldPrice + priceAddition;

    let newPrice = temp;

    this.setState({ priceOfBurger: newPrice, ingredients: updatedIngredients });

    this.updatePurchaseState(updatedIngredients);
  };
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  deleteIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    this.updatePurchaseState(updatedIngredients);
  };
  orderContinueHandler = () => {
    // this.setState({ loading: true });
    // const ingredientsTemp = {
    //   bacon: 0,
    //   cheese: 0,
    //   salad: 0,
    //   meat: 0
    // };
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "shlomo",
    //     address: {
    //       street: "herzel 2",
    //       city: "kfar-saba",
    //       zip: 1000
    //     }
    //   }
    // };

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    console.log("queryparam", queryParams);
    queryParams.push("price=" + this.state.priceOfBurger);
    const params = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout/",
      search: "?" + params
    });

    // this.props.history.push({
    //   pathname: "/checkout/",
    //   search: "?query=" + convertState
    // });

    //   .post("/orders.json", order)
    //   .then(order => {
    //     this.setState({ loading: false });
    //     console.log(order);
    //     this.setState({
    //       purchasing: false,
    //       priceOfBurger: 4,
    //       ingredients: ingredientsTemp
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  orderBurgerHandler = () => {
    let temp = this.state.order;
    this.setState({ order: !temp });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    let disableinfo = { ...this.state.ingredients };
    for (let key in disableinfo) {
      disableinfo[key] = disableinfo[key] <= 0;
      var orderOfUser = null;

      var burger = <Spinner />;
      if (this.state.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildContrals
              add={this.addIngredientHandler}
              delete={this.deleteIngredientHandler}
              disable={disableinfo}
              price={this.state.priceOfBurger}
              order={this.purchaseHandler}
              purchasable={this.state.purchasable}
            />
          </Aux>
        );
        orderOfUser = (
          <Aux>
            <OrderSummary
              visible={this.state.purchasable}
              price={this.state.priceOfBurger}
              ingredients={this.state.ingredients}
              orderCancel={this.purchaseCancelHandler}
              orderContinue={this.orderContinueHandler}
            />
          </Aux>
        );
      }

      if (this.state.loading) {
        orderOfUser = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          visible={this.state.purchasing}
          clickBackDrop={this.orderBurgerHandler}
        >
          {orderOfUser}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default BurgerBuilder;
