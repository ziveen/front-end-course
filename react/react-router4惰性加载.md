## react-router4下实现惰性加载的方法(react高阶组件)

```
export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                mod: null
            }
        }

        async componentDidMount() {
            const {default: component } = await importComponent();
            this.setState = ({
                mod: component
            });
        }

        render() {
            const Bund = this.state.mod;
            return Bund? <Bund {...this.props}/>: null;
        }
    }
    return AsyncComponent
}
```

- usage: `const A = asyncComponent(() => import("./**/**"))`    
        `<Route path="/**" component={A} />`
