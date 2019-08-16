import React, { Component } from 'react'
import RecipeItem from './RecipeItem'
import { getRecipesByIngredients } from '../services/recipes'

class RecipePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {
                thumbnail: '',
                title: '',
                ingredients: ''
            },
            data: [],
            loading: true
        }
    }

    async componentDidMount() {
        const { recipe } = this.props
        if (recipe) {
            await this.setState({ recipe: recipe, loading: false })
        }
        this.fetchRecipe(this.state.recipe.ingredients)
    }

    fetchRecipe = async ingredients => {
        const result = await getRecipesByIngredients(ingredients)

        const filtered = result.filter(ele => {
            return ele.title !== this.state.recipe.title
        })

        this.setState({
            data: filtered.splice(0, 4)
        })

        return
    }

    render() {
        const { thumbnail, title, ingredients } = this.state.recipe
        const { data } = this.state

        return (
            <React.Fragment>
                {!this.state.loading ? (
                    <div>
                        <img src={thumbnail} alt={title} />
                        <div className='card-body'>
                            <h5 className='card-title'>{title}</h5>
                            <p className='card-text'>
                                <strong>Ingredients: </strong>
                                {ingredients}
                            </p>
                            <h5 className='card-title'>Similar recipes</h5>
                            <div className='row'>
                                {data.map((recipe, index) => {
                                    return (
                                        <RecipeItem
                                            key={index}
                                            recipe={recipe}
                                            selected={this.props.selected}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default RecipePage
