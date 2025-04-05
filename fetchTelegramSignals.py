from telethon import TelegramClient
import asyncio
import json
import re

api_id = 27358398
api_hash = '7cbaae48620c6e68d2a8ab08afb2c08'
phone_number = '+989218545181'

channels = {
    "ETH": "CallAnalyserEth",
    "SOL": "CallAnalyserSol",
    "BSC": "CallAnalyserBSC"
}

client = TelegramClient('session_orbitalscan', api_id, api_hash)

def extract_buy_links(message_text):
    links = re.findall(r'(https?://\S+)', message_text)
    buy_links = [link for link in links if any(word in link.lower() for word in ["raydium", "pancakeswap", "uniswap", "birdeye", "dexscreener"])]
    return buy_links

async def fetch_and_save():
    await client.start(phone=phone_number)
    all_signals = []

    for chain, channel in channels.items():
        try:
            entity = await client.get_entity(channel)
            messages = await client.get_messages(entity, limit=10)
            
            for message in messages:
                if message.text:
                    buy_links = extract_buy_links(message.text)
                    if buy_links:
                        signal = {
                            "chain": chain,
                            "text": message.text,
                            "buy_links": buy_links,
                            "date": str(message.date)
                        }
                        all_signals.append(signal)

        except Exception as e:
            print(f"Error fetching from {channel}: {e}")

    # ذخیره سیگنال‌ها تو فایل JSON
    with open('signals.json', 'w', encoding='utf-8') as f:
        json.dump(all_signals, f, ensure_ascii=False, indent=4)

    print("✅ Signals saved to signals.json")

asyncio.run(fetch_and_save())
