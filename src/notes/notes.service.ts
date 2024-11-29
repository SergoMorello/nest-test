import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import {v4 as uuid} from 'uuid';

@Injectable()
export class NotesService {

	private data: Note[] = [];

	create(createNoteDto: CreateNoteDto) {
		const id = uuid();
		const note = {
			...createNoteDto,
			id
		};
		this.data.push(note);
		return note;
	}

	findAll() {
		return this.data;
	}

	findOne(id: string) {
		const note = this.data.find((note) => note.id === id);
		if (!note)
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		return note;
	}

	update(id: string, updateNoteDto: UpdateNoteDto) {
		for(const key in this.data) {
			if (this.data[key].id === id) {
				this.data[key] = {
					...this.data[key],
					...updateNoteDto
				}
				return this.data[key];
			}
		}
		throw new HttpException('Not found', HttpStatus.NOT_FOUND);
	}

	remove(id: string) {
		this.data = this.data.filter((note) => note.id !== id);
	}
}
