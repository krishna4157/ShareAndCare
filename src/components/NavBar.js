import React from 'react';
import { Header, Button, Title, Icon, Left, Body, Right } from 'native-base';

export default NavBar = ({iconName, goto, title}) => {
    return (
<Header style={{backgroundColor: '#4870DB'}}>
              <Left>
                <Button transparent onPress={() => goto()}>
                  <Icon name={iconName} />
                </Button>
              </Left>
              <Body>
                <Title>{title}</Title>
              </Body>
              <Right />
            </Header>
    );
}