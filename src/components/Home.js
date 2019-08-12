import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'
import { getRecipesByName } from '../services/recipes'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            page: 1
        }
    }

    async componentDidMount() {
        this.fetchRecipes()
    }

    fetchRecipes = async () => {
        const { page } = this.state
        let search = ''
        this.props.searchString
            ? (search = this.props.searchString)
            : (search = '')
        const response = await getRecipesByName(search, page)
        this.setState({
            recipes: response
        })
    }

    handlePageIncrement = async e => {
        e.preventDefault()

        switch (e.target.id) {
            case 'next':
                await this.setState({ page: this.state.page + 1 })
                break
            case 'prev':
                await this.setState({ page: this.state.page - 1 })
                break
            default:
                break
        }

        if (this.state.page <= 0) {
            this.setState({ page: 1 })
        }
        this.fetchRecipes()
    }

    render() {
        const { recipes } = this.state

        return (
            <div>
                <div className='row'>
                    {JSON.stringify(this.state.page)}
                    {recipes.map((recipe, index) => {
                        return (
                            <RecipeItem
                                key={index}
                                recipe={recipe}
                                mark={this.props.searchString}
                            />
                        )
                    })}
                </div>
                <div className='d-flex justify-content-center'>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button
                                    onClick={this.handlePageIncrement}
                                    id='prev'
                                    className='page-link'
                                    href='#'
                                >
                                    Previous
                                </button>
                            </li>
                            <li className='page-item'>
                                <button
                                    onClick={this.handlePageIncrement}
                                    id='next'
                                    className='page-link'
                                    href='#'
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    searchString: PropTypes.string,
    recipes: PropTypes.array
}

export default Home
