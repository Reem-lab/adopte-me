import { Component } from "react"
import { withRouter } from "react-router-dom"
import Carousel from "./Carousel";
import ErrorBoundries from "./ErrorBoundries";
import ThemeContext from "./ThemContext";
import Modal from "./modal";
class Details extends Component {
    state = { loading : true, showModal: false }
     
     async componentDidMount(){
         const res = await fetch (`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`)

         const json = await res.json();

         this.setState(Object.assign({ loading : false },json.pets[0]))
     }

     toggleModal = () => this.setState({ showModal : !this.state.showModal }) 
     adopt = () => ( window.location = "http://bit.ly/pet-adopt")

    render(){

        if(this.state.loading){
                return <h2>loading … </h2>;
        }

        const {animal, breed , city, state,  description, name, images , showModal} = this.state;
        return (
          <div className="details">
             <Carousel images={images} />
              <div>
                  <h1>{name}</h1>
                  <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                                <button style={{ backgroundColor: theme }}>Adopt {name}</button>
                            )
                        }
                    </ThemeContext.Consumer>
                  <p>{description}</p>
                  { showModal ? (
                      <Modal>
                          <div>
                              <h1>Would you like to adopt {name}?</h1>
                              <div className="buttons">
                                  <button onClick={this.adopt}>yes</button>
                                  <button onClick={this.toggleModal}>No</button>
                              </div>
                          </div>
                      </Modal>)
                       : null}
              </div>
          </div>
          )
        } 
}

const DetailsRoter = withRouter(Details)

export default function DetailsErrorBoundryInfo(){
    return (
    <ErrorBoundries>
       <DetailsRoter />
    </ErrorBoundries>
    )
};