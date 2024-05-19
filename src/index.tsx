import ReactDOM, { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './components/App.scss'

const root = document.getElementById('root')

if (!root) {
	throw new Error('Root not found!')
}

const container = ReactDOM.createRoot(root)

container.render(<App/>)
