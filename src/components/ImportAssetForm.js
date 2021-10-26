import React, { Component } from "react";
import ImportAssetFormAssetSelection from "./ImportAssetFormAssetSelection";
import ImportAssetFormError from "./ImportAssetFormError";
import ImportAssetFormImport from "./ImportAssetFormImport";
import ImportAssetFormSelectType from "./ImportAssetFormSelectType";
import ImportAssetFormSuccess from "./ImportAssetFormSuccess";

export class ImportAssetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      searchQuery: "",
      asset: null,
      searchResults: [],
      type: "",
      error: null,
    };
  }

  // next
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // prev
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // handle field change
  handleChange = (input) => (e) => {
    console.log(input, e.target.value);
    this.setState({ [input]: e.target.value });
  };

  importError = (error) => {
    this.setState({ error });
  };

  searchForAsset = (query) => {
    return fetch(`https://ue4-epicproxy.herokuapp.com/search?q=${query}`)
      .then((res) => res.json())
      .then((assets) => {
        if (assets.data && assets.data.elements)
          this.setState({ searchResults: assets.data.elements });
        else this.setState({ searchResults: [] });
      });
  };

  selectAsset = (asset) => (e) => {
    this.setState({ asset });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (prevState.searchQuery !== this.state.searchQuery) {
      if (!this.state.searchQuery || !this.state.searchQuery.length)
        this.setState({ searchResults: [] });
      // else this.searchForAsset(this.state.searchQuery);
    }

    if (prevState.asset !== this.state.asset) {
      this.nextStep();
    }
  }

  search = () => {
    this.searchForAsset(this.state.searchQuery);
  };

  render() {
    const { step, searchQuery, asset, searchResults, type, error } = this.state;
    const values = { searchQuery, asset, type, error };

    if (error)
      return (
        <ImportAssetFormError
          values={values}
          setStyle={this.props.setStyle}
          close={this.props.close}
        />
      );

    switch (step) {
      case 1:
      default:
        return (
          <ImportAssetFormAssetSelection
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            searchResults={searchResults}
            search={this.search}
            selectAsset={this.selectAsset}
            close={this.props.close}
          />
        );
      case 2:
        return (
          <ImportAssetFormSelectType
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            setStyle={this.props.setStyle}
            close={this.props.close}
          />
        );
      case 3:
        return (
          <ImportAssetFormImport
            nextStep={this.nextStep}
            values={values}
            setStyle={this.props.setStyle}
            close={this.props.close}
            importError={this.importError}
            addAsset={this.props.addItem}
            user={this.props.user}
          />
        );

      case 4:
        return (
          <ImportAssetFormSuccess
            nextStep={this.nextStep}
            values={values}
            setStyle={this.props.setStyle}
            close={this.props.close}
          />
        );
    }
  }
}

export default ImportAssetForm;
