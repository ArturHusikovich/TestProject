import React from 'react';

class Status extends React.Component{
    state = {
        editMode: false,
        status: this.props.status 
    }
    
    activeMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactiveMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateProfileStatusThunk(this.state.status)
    }
    updateLocalStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status)
        this.setState({
            status: this.props.status
        })
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                <div><span onDoubleClick={this.activeMode}>{this.props.status || "No Status"}</span></div>
                }

                {this.state.editMode &&
                <div><input onChange={this.updateLocalStatus} 
                            autoFocus={true} 
                            onBlur={this.deactiveMode} 
                            value={this.state.status} /></div>
                }
            </div>
        ) 
    }
}

export default Status;