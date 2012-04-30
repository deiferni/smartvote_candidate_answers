# -*- coding: utf-8 -*-
"""
Created on Apr 30, 2012

@author: David Erni
@copyright: Politools
"""
# -*- coding: utf-8 -*-
import csv
import json
import os


ANSWER_CODES_TO_LABEL = {0: 'Nein',
                         25: 'Eher Nein',
                         75: 'Eher Ja',
                         100: 'Ja'}

BUDGET_ANSWER_CODES_TO_LABEL = {0: 'Weniger Ausgeben',
                                50: 'Gleich viel Ausgeben',
                                100: 'Mehr Ausgeben'}


def run():
    """Convert old data to a nicer JSON file."""

    with open('fragebogen_bern2008.csv') as question_file, \
                       open('data_bern2008_stadtratswahlen.csv') as answer_file:

        # find all questions
        questions = {}
        reader = csv.DictReader(question_file)
        for row in reader:
            question = dict(text=row['question'],
                            id=int(row['question_id']),
                            answers = dict())
            questions[int(row['question_id'])] = question

        # find all answers, numeric values for questions used
        reader = csv.DictReader(answer_file)
        for row in reader:
            if int(row['smartvote_completed']) != 1: continue
            for key, value in row.items():
                if key.startswith('answer_'):
                    question_id = int(key.split('_')[1])
                    if not question_id in questions: continue

                    answer_code = int(value)
                    question = questions[question_id]

                    old_count = question['answers'].get(answer_code, 0)
                    question['answers'][answer_code] = old_count + 1

        # convert number of answers to percentage, for each question
        for question in questions.values():
            nof_answers = float(sum(question['answers'].values()))

            sorted_answers = []
            is_budget = 50 in question['answers']

            for key in sorted(question['answers'].keys()):
                value = question['answers'][key]
                percentage_value = round((float(value)/nof_answers) * 100, 2)
                lookup = BUDGET_ANSWER_CODES_TO_LABEL if is_budget else \
                            ANSWER_CODES_TO_LABEL
                label = lookup[key]
                sorted_answers.append(dict(value=percentage_value,
                                           label=label))
            question['answers'] = sorted_answers

        # write as JSON to output file.
        filepath = os.path.abspath(os.path.join('..', 'html', 'data.json'))
        with open(filepath, 'w') as json_file:
            json_file.write(json.dumps(questions.values(),
                                       sort_keys=False, indent=4))


if __name__ == '__main__':
    run()
