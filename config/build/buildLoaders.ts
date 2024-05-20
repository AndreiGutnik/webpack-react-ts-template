import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { ModuleOptions, runtime } from 'webpack';

import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  //fonts
	const fontsLoader = {
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
		generator: {	
			publicPath: 'fonts/',		
			outputPath: 'fonts/',
		},
	}
	
	//SVG
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  //assets images
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
		generator: {	
			publicPath: 'images/',		
			outputPath: 'images/',
		},
  };

  //SCSS + CSS
	const cssLoaderWithModules = {
		loader: "css-loader",
		options: {
			modules: {
					localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
			},
		},
	}

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      //'css-loader',
			cssLoaderWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  //CSS
  const cssLoader = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  };

  //ts-loader
  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
    exclude: /node_modules/,
  };

	//babel-loader
	const babelLoader = 
	{
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					['@babel/preset-react', {
						runtime: isDev ? 'automatic' : 'classic',
					}]
				]
			}
		}
	}

  return [
    assetLoader,
    scssLoader,
    // cssLoader,
    //tsLoader,
		babelLoader,
    svgLoader,
		fontsLoader,
  ];
}
