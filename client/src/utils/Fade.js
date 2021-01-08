import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import React from 'react';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};

const Fade = ({ in: inProp, children, ...props }) => {
    return (
        <Transition in={inProp} timeout={duration} appear mountOnEnter unmountOnExit {...props}>
            {(state) =>
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            style: {
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }
                        });
                    }
                    return child;
                })
            }
        </Transition>
    );
};

Fade.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    in: PropTypes.bool.isRequired
};

export default Fade;
