import { Progress } from '@chakra-ui/react';


function HorizontalProgressBar(props) {
  const { progress } = props;
    return (
        <Progress
        colorScheme="blue"
        hasStripe={true}
        size={"lg"}
        value={progress}
        w={'72%'}
        borderRadius="3px"
        border={'1px solid #2C5282'}
        />
    );
  
}
export default HorizontalProgressBar;