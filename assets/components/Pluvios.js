import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Pluvios extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            pluvios: null
        };
    }

    componentDidMount() {
        fetch(process.env.SITE_URL + "/api/private/pluvios", {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then(async res => {
            if (res.status === 200) {
                let data = await res.json();
                this.setState({
                    loading: false,
                    pluvios: JSON.parse(data)
                });
            } else {
                this.props.history.replace('/404');
            }
        })
    }

    render() {
        return (
            <div className="container xs">
                {this.state.loading ? (
                    <div className="spinner-border m-auto d-block" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Mes pluvios</h1>
                            <Link to='/ajouter-un-pluvio'>
                                <button className="btn btn-primary">Ajouter un pluvio</button>
                            </Link>
                        </div>
                        <ul className="items">
                            {this.state.pluvios.length > 0 ? (
                                <>
                                    {this.state.pluvios.map((pluvio) => {
                                        return (
                                            <li key={pluvio.id} className="item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h2>{pluvio.name}</h2>
                                                    <span>Nombre de relevés : {pluvio.nbReleves}</span>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between align-items-center mt-3">
                                                    <Link to={"/ajouter-un-releve/" + pluvio.id}>
                                                        <button className="btn btn-primary">Ajouter un relevé
                                                        </button>
                                                    </Link>
                                                    <Link to={"/pluvio/" + pluvio.id}>Voir l'emplacement</Link>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </>
                            ) : (
                                <p className="text-center mt-5">Vous n'avez pas de pluvio</p>
                            )}
                        </ul>
                    </>
                )}
            </div>
        )
    }
}

export default withRouter(Pluvios);