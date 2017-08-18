import React,{Component} from 'react'

export class Tab extends Component {
  constructor(props){
    super(props)
  }
  click(i){
    this.props.changeTab && this.props.changeTab(i)
  }
  render() {
    let { text, tabIndex } = this.props
    return (
      <div className="hj-tab">
        {
          text.map((item, index) => {
            let className = 'item ' + (tabIndex === index ? 'active' : '')
            return(
              <div key={index} className={className} onClick={this.click.bind(this, index)}>{item}</div>
            )
          })
        }
      </div>
    )
  }
}
