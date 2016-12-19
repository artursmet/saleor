import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

import ProductItem from './ProductItem';
import SortBy from './SortBy';

class ProductList extends Component {

  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    products: PropTypes.object,
    sortingValue: PropTypes.string,
    setSorting: PropTypes.func
  };

  onLoadMore = () => this.props.onLoadMore();
  setSorting = (event) => this.props.setSorting(event);

  render() {
    const { edges, pageInfo: { hasNextPage } } = this.props.products;
    return (
      <div>
        <SortBy sortingValue={this.props.sortingValue} setSorting={this.setSorting} />
        <div>
          {edges && (edges.map((edge, i) => (
            <ProductItem key={i} product={edge.node} />
          )))}
        </div>
        <div className="load-more">
          {hasNextPage && (
            <button className="btn" onClick={this.onLoadMore}>Load more</button>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(ProductList, {
  fragments: {
    products: () => Relay.QL`
      fragment on ProductTypeConnection {
        edges {
          node {
            ${ProductItem.getFragment('product')}
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    `,
  },
});
