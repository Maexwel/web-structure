import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateViewAction } from '../../../store/actions/viewActions';
import { withRouter } from 'react-router-dom';

// Base Page template of the application
const Page = (props) => {
    const { component: Component, path, viewToState, history, route } = props; // Component to inject

    useEffect(() => {
        viewToState({ currentPage: route }); // set the current page (route = { path: '/', name: '/' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route])

    return (
        <div>
            {/** Component injection */}
            <Component {...props} />
        </div>
    )
}

// // // 

// Redux connexion
const mapStateToProps = state => ({
    currentPage: state.view.currentPage // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {
        viewToState: (val) => {
            dispatch(
                updateViewAction(val) // Update the view
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));