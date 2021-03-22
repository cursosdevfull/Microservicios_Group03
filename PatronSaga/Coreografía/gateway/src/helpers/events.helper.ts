import { EventEmitter } from 'events';

export class EventsHelper {
	private static instance: EventsHelper;
	private emitter: EventEmitter;

	private constructor() {}

	private setEmitter() {
		this.emitter = new EventEmitter();
	}

	public static handler(): EventEmitter {
		if (!EventsHelper.instance) {
			EventsHelper.instance = new EventsHelper();
			EventsHelper.instance.setEmitter();
		}

		return EventsHelper.instance.emitter;
	}
}
