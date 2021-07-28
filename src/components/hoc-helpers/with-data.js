import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View)=>{
  return class extends Component {
      state = {
        data: null,
        isLoading: true,
        isError: false
      };

      componentDidUpdate(prevProps) {
        if(this.props.getData !== prevProps.getData){
          this.update();
        }
      }

      componentDidMount() {
        this.update();
      }

      update() {
        this.props.getData()
        .then((data) => {
            this.setState({
              data,
              isLoading: false
            });
          })
          .catch((err) => {
            this.setState({
              isError: true,
              isLoading: false
            });
          });
      }

      render() {
        const { data, isLoading, isError} = this.state;

        const spinner = isLoading ? <Spinner /> : null;
        const errorMessage = isError ? <ErrorIndicator /> : null;

        const viewProps = {
          data,
          onItemSelected: this.props.onItemSelected,
          renderItem: this.props.children
        };

        var content = !isLoading && !isError ?
          <View {...viewProps} /> :
          null;


        return (
          <React.Fragment>
            { spinner }
            { errorMessage }
            { content }
          </React.Fragment>
        );
      }

  };
}

export default withData;
