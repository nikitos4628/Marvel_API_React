import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest()
	}

	onRequest = (offset) => { 
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		this.setState(({offset, charList}) => ({
			charList: [...charList, ...newCharList], 
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended
		}))
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	itemRefs = [];

	setRef = (ref) => {
		this.itemRefs.push(ref)
	}

	focusOnItem = (id) => {
		this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
		this.itemRefs[id].classList.add('char__item_selected');
		this.itemRefs[id].focus();
	}

	renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = {'objectFit' : 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit' : 'unset'};
			}

			return (
				<li 
					className="char__item"
					tabIndex={0}
					ref={this.setRef}
					key={item.id}
					onClick={() => {
						this.props.onCharSelected(item.id);
						this.focusOnItem(i);
						}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							this.props.onCharSelected(item.id);
							this.focusOnItem(i);
						}
					}}>

                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
            </li>
			)
		});

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	render() {

		const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

		const items = this.renderItems(charList);

		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button 
				className="button button__main button__long"
				style={{'display': charEnded ? 'none' : 'block'}}
				disabled={newItemLoading}
				onClick={() => this.onRequest(offset)}>
            <div className="inner">load more</div>
            </button>
			</div>
		)
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;



// import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

// const CharList = () => {
//     return (
//         <div className="char__list">
//             <ul className="char__grid">
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item char__item_selected">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default CharList;