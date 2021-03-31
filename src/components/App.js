import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "./Post/Post";
import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => console.log(err));
  }
  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => console.log(err));
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((res) => {
        this.setState({ posts: res.data }).catch((err) => console.log(err));
      });
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((res) => {
        this.setState({ posts: res.data })
      }).catch(err => console.log(err))
  }

  render() {
    const { posts } = this.state;
    const postMap = posts.map((post, i) => {
      <post
        key={i}
        text={post.text}
        date={post.date}
        id={post.id}
        update={this.updatePost}
        deletePost={this.deletePost}
      />;
    });

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose create={this.createPost} />
          {postMap}
        </section>
      </div>
    );
  }
}

export default App;
