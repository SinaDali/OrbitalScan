import json
import os
from telethon import TelegramClient, events

# تنظیمات تلگرام با اطلاعات شما:
api_id = 27358398
api_hash = "7cbaae48620c6e68d2a8ab08afb2c088"

# ایجاد نمونه‌ی TelegramClient و فایل session
client = TelegramClient('orbital_session', api_id, api_hash)

async def update_signals(chain_key, message_text):
    """
    به‌روزرسانی فایل signals.json با پیام جدید دریافتی.
    chain_key: یکی از 'eth'، 'sol' یا 'bsc'
    message_text: متن پیام دریافتی از تلگرام
    """
    signals_file = 'signals.json'

    # اگر فایل signals.json وجود ندارد، یک ساختار پیش‌فرض ایجاد می‌کنیم.
    if not os.path.exists(signals_file):
        data = {"eth": [], "sol": [], "bsc": []}
    else:
        with open(signals_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

    # ساخت سیگنال جدید (شما می‌توانید این بخش را براساس نیاز تغییر دهید)
    new_signal = {
        "name": message_text,
        "confidence": 100
    }

    # افزودن سیگنال جدید به بخش مربوطه
    data[chain_key].append(new_signal)

    # نگه‌داشتن فقط آخرین 20 سیگنال
    data[chain_key] = data[chain_key][-20:]

    # ذخیره مجدد در فایل signals.json
    with open(signals_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"[{chain_key.upper()}] New Signal Saved: {message_text}")

# هندلر برای دریافت پیام‌های جدید از کانال تلگرام ETH
@client.on(events.NewMessage(chats=['CallAnalyserEth']))
async def eth_handler(event):
    message_text = event.raw_text
    await update_signals("eth", message_text)

# هندلر برای دریافت پیام‌های جدید از کانال تلگرام SOL
@client.on(events.NewMessage(chats=['CallAnalyserSol']))
async def sol_handler(event):
    message_text = event.raw_text
    await update_signals("sol", message_text)

# هندلر برای دریافت پیام‌های جدید از کانال تلگرام BSC
@client.on(events.NewMessage(chats=['CallAnalyserBsc']))
async def bsc_handler(event):
    message_text = event.raw_text
    await update_signals("bsc", message_text)

async def main():
    print("Starting Telegram Client...")
    await client.start()
    print("Client is running. Listening for new messages...")
    await client.run_until_disconnected()

if __name__ == "__main__":
    client.loop.run_until_complete(main())
