export const updateEmoji = (sliderValue) => {
    switch(true) {
        case sliderValue===0:
            return 'slightly_smiling_face';
        case sliderValue===10:
            return 'tired_face';
        case sliderValue>=8 :
            return 'persevere';
        case sliderValue>=6 :
            return 'weary';
        case sliderValue===5 :
            return 'worried';
        case sliderValue<=2 :
            return 'neutral_face';
        case sliderValue<=4 :
            return 'slightly_frowning_face';
        default:
            return 'slightly_smiling_face';
    }
}


// slightly_smiling_face - nopain
// neutral_face - mildpain
// face_with_rolling_eyes - moderate pain
// worried - Severe Pain
// weary - Worst Possible Pain