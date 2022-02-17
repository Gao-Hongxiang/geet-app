import { Route, RouteProps } from 'react-router-dom';

// 使用方式：
/*
	<KeepAlive path="/home">
		<Layout />
	</KeepAlive>
*/
export const KeepAlive = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      children={(props) => {
        const isMatch = props.match !== null;

        return (
          <div
            style={{
              height: '100%',
              display: isMatch ? 'block' : 'none',
            }}
          >
            {children}
          </div>
        );
      }}
    />
  );
};