import { SiweMessage } from "siwe";
import { BrowserProvider } from "ethers";

const domain = window.location.host;
const origin = window.location.origin;

export const createSiweMessageAndSign = async (provider: BrowserProvider, statement: string)
    : Promise<{ message: string, signature: string }> =>
{
    const network = await provider.getNetwork();
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}user/nonce/${address}`);
    const { nonce } = await res.json();

    const siweMessage = new SiweMessage({
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: Number(network.chainId),
        nonce,
    });

    const message = siweMessage.prepareMessage();

    const signature = await signer.signMessage(message);

    return { message, signature }
}

export const getSignerAddress = async (provider: BrowserProvider): Promise<string> => {
    const signer = await provider.getSigner();
    return signer.getAddress();
}
