import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'
import { getRecipesByName } from '../services/recipes'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            page: 1,
            searchString: ''
        }
    }

    async componentDidMount() {
        let search = ''
        this.props.searchString
            ? (search = this.props.searchString)
            : (search = '')
        await getRecipesByName(search, this.state.page).then(res => {
            this.setState({ recipes: res, searchString: search })
        })
    }

    handleNext = async () => {
        const { searchString, page } = this.state

        const response = await getRecipesByName(searchString, page + 1)
        this.setState({
            recipes: response,
            page: page + 1
        })
    }

    handlePrevious = async () => {
        const { searchString, page } = this.state

        const response = await getRecipesByName(searchString, page - 1)
        this.setState({
            recipes: response,
            page: page - 1
        })
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
                                selected={this.props.selected}
                            />
                        )
                    })}
                </div>
                <div className='d-flex justify-content-center'>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button
                                    onClick={
                                        this.state.page >= 1
                                            ? this.handlePrevious
                                            : null
                                    }
                                    id='prev'
                                    className='page-link'
                                    href='#'
                                >
                                    Previous
                                </button>
                            </li>
                            <li className='page-item'>
                                <button
                                    onClick={this.handleNext}
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
