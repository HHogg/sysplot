import FermatSpiral from './FermatSpiral';

const VogelSpiral = (...args) => FermatSpiral(...args, 2.39998131);

VogelSpiral.NORMALISATION_FACTOR = 2.025;

export default VogelSpiral;
