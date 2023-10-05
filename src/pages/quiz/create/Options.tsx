import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography, Checkbox } from "@mui/material";
import { Add, Delete } from "@mui/icons-material"
import { Option } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { newQuizActions } from "../../../redux/slices/newQuiz";
import { StoreStateType, useAppSelector } from "../../../redux";

type UpdateOption = { id: number } & Partial<Option>

type OptionProps = {
    option: Option
    updateOption: (update: UpdateOption) => void
    deleteOption: (id: number) => void
}

function Option(props: OptionProps) {
    return <Stack direction="row">
        <FormControlLabel
            label={<TextField
                fullWidth
                size="small"
                name="quiz option"
                value={props.option.value}
                onChange={e => props.updateOption({ id: props.option.id, value: e.target.value })} />}

            control={<Checkbox
                value={props.option.isAnswer}
                onChange={(_, checked) => props.updateOption({ id: props.option.id, isAnswer: checked })} />}
        />

        <IconButton onClick={() => props.deleteOption(props.option.id)}>
            <Delete />
        </IconButton>
    </Stack>
}

type OptionsProps = {
    error?: string
}

export function Options(props: OptionsProps) {
    const lastId = useRef(0)
    const dispatch = useDispatch()
    const options = useAppSelector(store => store.newQuiz?.quiz?.options)

    function addOption() {
        const newId = ++lastId.current

        dispatch(newQuizActions.addOption({
            id: newId,
            value: "",
            isAnswer: false
        }))

        //props.setOptions(options => [...(options || []), ])
    }

    function updateOption(update: UpdateOption) {
        dispatch(newQuizActions.updateOptionById({updated: update, optionId: update.id }))
    }

    function deleteOption(id: number) {
        dispatch(newQuizActions.deleteOptionById({ id }))
    }

    return <Stack direction="column" width="100%">
        <Stack
            gap="1em">

            {options?.map(option => <Option
                key={option.id}
                option={option}
                updateOption={updateOption}
                deleteOption={deleteOption} />)}
        </Stack>

        {options?.length ? <Typography marginTop="0.5em" fontSize="small" textAlign="center">(Select the correct answers)</Typography> : null}

        <Typography color="error">{props.error}</Typography>

        <Button
            style={{ margin: "1em auto 0" }}
            startIcon={<Add />}
            onClick={addOption}>
            Add choice
        </Button>
    </Stack>
}