import React, { Component } from "react";
import Aux from "../../Hoc/Hoc";
import Modal from "../../Component/UI/Modal/Modal";
import Burger from "../../Component/Burger/Burger";
import BuildContrals from "../../Component/BuildContrals/BuildContrals";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../Hoc/ErrorHandler";
import { connect } from "react-redux";
import axios from "../../axios-order";
import * as burgerBuilder from "../../store/actions/index";
import Spinner from "../../Component/Spinner/Spinner";
// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// };

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      purchasing: false
    };
  }
  //to update
  componentDidMount() {
    this.props.getIngredientsFromFirebase();
    // axios
    //   .get("/ingredients.json ")
    //   .then(response => {
    //     this.props.getIngredientsFromFirebase(response.data);
    //   })
    //   .catch(err => {});
    // let ingredientsTemp = {
    //   bacon: 0,
    //   cheese: 0,
    //   salad: 0,
    //   meat: 0
    // };
    // this.setState({ ingredients: ingredientsTemp });
  }
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   let priceAddition = INGREDIENT_PRICES[type];
  //   let oldPrice = this.state.priceOfBurger;
  //   let temp = oldPrice + priceAddition;

  //   let newPrice = temp;

  //   this.setState({ priceOfBurger: newPrice, ingredients: updatedIngredients });

  //   this.updatePurchaseState(updatedIngredients);
  // };
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // deleteIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

  //   this.updatePurchaseState(updatedIngredients);
  // };
  orderContinueHandler = () => {
    this.props.burgerPureChase();
    this.props.history.push({ pathname: "/checkout" });

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }

    // queryParams.push("price=" + this.state.priceOfBurger);
    // const params = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout/",
    //   search: "?" + params
    // });

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
    if (this.props.auth) {
      this.setState({ purchasing: true });
    } else {
      console.log("purchAble");
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    let disableinfo = { ...this.props.ingredients };

    for (let key in disableinfo) {
      disableinfo[key] = disableinfo[key] <= 0;
      var orderOfUser = null;

      var burger = this.props.error ? <p>There is a problem </p> : <Spinner />;
      if (this.props.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients={this.props.ingredients} />
            <BuildContrals
              add={this.props.addIngredient}
              delete={this.props.removeIngredient}
              disable={disableinfo}
              auth={this.props.auth}
              price={this.props.totalPrice}
              order={this.purchaseHandler}
              purchasable={this.updatePurchaseState(this.props.ingredients)}
            />
          </Aux>
        );
        orderOfUser = (
          <Aux>
            <OrderSummary
              visible={this.state.purchasable}
              price={this.props.totalPrice}
              ingredients={this.props.ingredients}
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
const mapStateHandler = state => {
  return {
    ingredients: state.ing.ingredients,
    totalPrice: state.ing.total_price,
    error: state.ing.error,
    purChase: state.orders.purchased,
    auth: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addIngredient: name => dispatch(burgerBuilder.addIngredient(name)),
    removeIngredient: name => dispatch(burgerBuilder.removeIngredient(name)),
    getIngredientsFromFirebase: () => dispatch(burgerBuilder.initIngredient()),
    burgerPureChase: () => dispatch(burgerBuilder.purchaseInit()),
    onSetRedirectPath: path => dispatch(burgerBuilder.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateHandler,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
