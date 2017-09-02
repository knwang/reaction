import React from 'react';

class CreateBoardTileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleTitleChange = (e) => {
    e.preventDefault();

    this.setState({
      title: e.target.value
    });
  }

  render() {
    return (
      <section className="new-board-form">
        <header>
          <span>Create Board</span>
          <a 
            href="#" 
            className="icon-sm icon-close"
            onClick={this.props.onCloseClick}
          ></a>
        </header>
        <form>
          <dl>
            <dt>Title</dt>
            <dd>
              <input 
                type="text" 
                placeholder='Like "Publishing Calendar"...' 
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </dd>
          </dl>
          <button type="submit">Create</button>
        </form>
      </section>
    );
  }
}

export default CreateBoardTileForm;
