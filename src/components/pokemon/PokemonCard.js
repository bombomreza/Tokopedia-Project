import React, { Component } from 'react'
import styled from "@emotion/styled";
import spinner from "../other/spinner.gif";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {fetchOwnedPoke} from '../../redux/actions'
import Axios from 'axios'
import { api_url } from "../../helpers/api_url"

const PokemonImg = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const PokeCard = styled.div`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`

class PokemonCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex:'',
    imageLoading: true,
    toManyRequest: false,
    Owned : "",
  }
  componentDidMount () {
    const {name, url} = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length-2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
    });
    this.ownedPokemon()
  }
    ownedPokemon = () => {
      const {pokemonIndex} = this.state
      Axios.get(`${api_url}/pokemonlist/${pokemonIndex}`)
        .then((res) => {
          this.setState({
            Owned: res.data[this.state.pokemonIndex].owned
          })
        })
        .catch((err) => {console.log(err)})
    }
    
    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
            <LinkItem to={`pokemon/${this.state.pokemonIndex}`}>
              <PokeCard className="card">
                <h5 className= "card-header">
                  Owned:  {this.state.Owned}
                </h5>
                {this.state.imageLoading ? (
                  <img src={spinner} style={{width: "5em", height: "5em"}} className="card-img-top rounded mx-auto d-block mt-2" alt=""></img>
                ) : null}
                <PokemonImg 
                  className= "card-img-top rounded mx-auto mt-2"
                  onLoad={() => this.setState({imageLoading: false})}
                  onError={() => this.setState({toManyRequest: true})}
                  src={this.state.imageUrl}
                  style={
                    this.state.toManyRequest ? {display:"none"} :
                    this.state.imageLoading ? null : {display: "block"}}
                />
                {this.state.toManyRequest ? (<h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">To Many Request</span>
                </h6>) : null}

                <div className="card-body mx-auto">
                  <h6 className="card-title">
                    {this.state.name
                      .toLowerCase()
                      .split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </h6>
                </div>
              </PokeCard>
              </LinkItem>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
  return {
    pokemonList : state.pokeList.pokeList

  }
}

export default connect(mapStatetoProps, {fetchOwnedPoke}) (PokemonCard)