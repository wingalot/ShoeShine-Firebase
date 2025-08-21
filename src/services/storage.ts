'use server';

import fs from 'fs/promises';
import path from 'path';

// WARNING: This is a simple file-based storage for a single-session kiosk.
// It is NOT suitable for multi-user or concurrent environments.
const DB_PATH = path.join(process.cwd(), '.db.json');

interface Session {
    phone: string;
    code: string;
    startTime: string;
}

async function readDb(): Promise<Session | null> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            return null; // File doesn't exist, which is fine.
        }
        console.error("Failed to read from storage:", error);
        throw new Error("Could not read session data.");
    }
}

async function writeDb(data: Session | null): Promise<void> {
    try {
        if (data === null) {
            await fs.unlink(DB_PATH);
        } else {
            await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
        }
    } catch (error) {
        console.error("Failed to write to storage:", error);
        throw new Error("Could not save session data.");
    }
}

// For this simple kiosk, we assume there's only ever one active session.
export async function getActiveSession(): Promise<Session | null> {
    return await readDb();
}

export async function createSession(phone: string): Promise<Session> {
    const existingSession = await getActiveSession();
    if (existingSession) {
        // This case should ideally not happen if the UI is properly disabled.
        throw new Error("Another session is already in progress.");
    }

    // Generate a random 6-digit code.
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const newSession: Session = {
        phone: phone,
        code: code,
        startTime: new Date().toISOString()
    };
    await writeDb(newSession);
    console.log(`Session created for ${phone} with code ${code}`);
    return newSession;
}

export async function clearActiveSession(): Promise<void> {
    await writeDb(null);
    console.log("Active session cleared.");
}
