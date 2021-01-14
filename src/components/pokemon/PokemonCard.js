import React, { Component } from 'react'
import styled from "@emotion/styled";
import spinner from "../other/spinner.gif";
import { Link } from "react-router-dom";
// import axios from "axios";

// const TYPE_COLORS = {
//   bug: 'B1C12E',
//   dark: '4F3A2D',
//   dragon: '755EDF',
//   electric: 'FCBC17',
//   fairy: 'F4B1F4',
//   fighting: '823551D',
//   fire: 'E73B0C',
//   flying: 'A3B3F7',
//   ghost: '6060B2',
//   grass: '74C236',
//   ground: 'D3B357',
//   ice: 'A3E7FD',
//   normal: 'C8C4BC',
//   poison: '934594',
//   psychic: 'ED4882',
//   rock: 'B9A156',
//   steel: 'B5B5C3',
//   water: '3295F6'
// };

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


export default class PokemonCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex:'',
    imageLoading: true,
    toManyRequest: false,
    // types:[]
  }
  componentDidMount () {
    const {name, url} = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length-2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    
    // const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    // const pokemonRes =   axios.get(pokemonUrl);


    // const types = pokemonRes.data.types.map(type => type.type.name);

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      // types
    });


  }
    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
            <LinkItem to={`pokemon/${this.state.pokemonIndex}`}>
              <PokeCard className="card">
                <h5 className= "card-header">
                  {this.state.pokemonIndex}
                  {/* {this.state.types.map(type => (
                        <span key={type}
                        className="badge badge-primary badge-pill mr-1"
                        style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white'}}
                        >
                        
                        {type
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')
                        }</span>
                      ))} */}
                
                
                </h5>
                {this.state.imageLoading ? (
                  <img src={spinner} style={{width: "5em", height: "5em"}} className="card-img-top rounded mx-auto d-block mt-2"></img>
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
