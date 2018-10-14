import * as React from 'react';

interface IProps {}

export class NotFound extends React.Component<any, any> {
    constructor(props: IProps) {
        super(props as any);

    }

    render() {
        return (
            <div>
                <h1>Page Not Found</h1>
                <p>The page you are trying to access cannot be found, please go back to <a href='/'>the homepage</a></p>
            </div>
        )
    }
}