import React, { Component } from 'react'
import { TextField, Paper, Button, Grid, Radio } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Dropdown, PreviewCard } from './index'
import { withStyles } from '@material-ui/core/styles'
import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const COURSES = gql`
  query Courses($name: String, $branch: String) {
    courses(where: { name: $name, branch: $branch }) {
      name
    }
  }
`

const ADD_QUESTION = gql`
  mutation AddQuestion(
    $picture: Upload
    $a: String!
    $b: String!
    $c: String!
    $d: String!
    $ans: String!
    $desc: String!
    $name: String!
    $course: String!
    $exp: String!
  ) {
    addQuestion(
      name: $name
      desc: $desc
      exp: $exp
      ans: $ans
      picture: $picture
      Obj: { a: $a, b: $b, c: $c, d: $d }
      course: $course
    ) {
      id
    }
  }
`
const GET_QUESTION_PICTURE = gql`
query Question($id: String!){
    question(id: $id){
        display
    }
}
`

const styles = {
  paper: {
    outline: 'none',
    width: '80%',
    maxWidth: 1000,
    padding: '30px',
    overflow: 'auto'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    position: 'fixed'
  },
  answer: {
    display: 'flex'
  },
  radioWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  radio: { marginRight: '5px', width: '20px', height: '20px' },
  action: { width: '100%' }
}
const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color='default' {...props} />)

const makeDefaults = () => ({
    name: '',
    desc: '',
    opt: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    ans: ''
  })

class EditQuestion extends Component {
  constructor(props) {
      super(props)
      this.state={ ...props.question, courses: [], picture: null, exp: '' }
  }
  onChange = ({ target }) => {
    this.setState({
      picture: target.files[0],
      preview: URL.createObjectURL(target.files[0])
    })
  }
  handleRadioChange = (e, v) => {
    this.setState({ ans: e.target.value })
  }
  onInputChange = ({ target }) => {
    let newstate = this.state
    newstate[target.name] = target.value
    this.setState(newstate)
  }
  onOptionInputChange = ({ target }) => {
    let newstate = this.state
    newstate.options[target.name] = target.value
    this.setState(newstate)
  }
  checkQuestion = () => {
    let flag = !!this.state.course
    let defaults = makeDefaults()
    if (flag) {
      Object.keys(this.state).map(k => {
        if (k != 'options' && k in defaults && this.state[k] == defaults[k]) {
          flag = false
        }
      })
    }
    if (flag) {
      Object.keys(this.state.opt).map(k => {
        if (this.state.opt[k] === defaults.options[k]) {
          flag = false
        }
      })
    }
    return flag
  }
  onSubmit = e => {
    const { picture, desc, name, options, exp, course, answer } = this.state
  }
  onDropdownChange = (value, e) => {
    let newstate = this.state
    newstate[e.name] = value
    let { client } = this.props
    client
      .query({
        query: COURSES,
        variables: { branch: value.value }
      })
      .then(({ data }) => {
        this.setState({ courses: data.courses })
      })
    this.setState(newstate)
  }
  removeImage = () => {
    this.setState({ picture: null, preview: undefined })
  }
  componentDidMount() {
      const {id} = this.state
      const {client} = this.props
      client.query({
          query: GET_QUESTION_PICTURE,
          variables: {id},
      }).then(({data}) => {
          console.log(data)
          this.setState({preview: data.question.display})
      })
  }
  
  render () {
    let { branches } = this.props
    const courses = this.state.courses.map(d => ({
      label: d.name,
      value: d.name
    }))
    const { answer } = this.state
    return (
      <Paper style={styles.paper}>
        <Grid container spacing={3} style={{ height: 'auto' }}>
          <Grid item sm={6}>
            <Dropdown
              options={branches}
              onChange={this.onDropdownChange}
              label='Branch'
              name='branch'
            />
          </Grid>
          <Grid item sm={6}>
            <Dropdown
              options={courses}
              onChange={this.onDropdownChange}
              label='Course'
              name='course'
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label='Question Name'
              placeholder='Question Name'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              name='name'
              onChange={this.onInputChange}
              value={this.state.name}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label='Question Description'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              multiline
              name='desc'
              placeholder='Question Description with an equation: $ x^2+2x+4 $'
              onChange={this.onInputChange}
              value={this.state.desc}
            />
          </Grid>
          <Grid style={styles.answer} item sm={6}>
            <div style={styles.radioWrap}>
              <GreenRadio
                inputProps={{ 'aria-label': 'Radio A' }}
                style={styles.radio}
                checked={answer == 'a'}
                onChange={this.handleRadioChange}
                value='a'
              />
            </div>
            <TextField
              label='Option A'
              placeholder='Option A'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              name='a'
              onChange={this.onOptionInputChange}
              value={this.state.opt.a}
            />
          </Grid>
          <Grid style={styles.answer} item sm={6}>
            <div style={styles.radioWrap}>
              <GreenRadio
                inputProps={{ 'aria-label': 'Radio A' }}
                style={styles.radio}
                checked={answer == 'b'}
                onChange={this.handleRadioChange}
                value='b'
              />
            </div>
            <TextField
              label='Option B'
              placeholder='Option B'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              name='b'
              onChange={this.onOptionInputChange}
              value={this.state.opt.b}
            />
          </Grid>
          <Grid style={styles.answer} item sm={6}>
            <div style={styles.radioWrap}>
              <GreenRadio
                inputProps={{ 'aria-label': 'Radio A' }}
                style={styles.radio}
                checked={answer == 'c'}
                onChange={this.handleRadioChange}
                value='c'
              />
            </div>
            <TextField
              label='Option C'
              placeholder='Option C'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              name='c'
              onChange={this.onOptionInputChange}
              value={this.state.opt.c}
            />
          </Grid>
          <Grid style={styles.answer} item sm={6}>
            <div style={styles.radioWrap}>
              <GreenRadio
                inputProps={{ 'aria-label': 'Radio A' }}
                style={styles.radio}
                checked={answer == 'd'}
                onChange={this.handleRadioChange}
                value='d'
              />
            </div>
            <TextField
              label='Option D'
              placeholder='Option D'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              name='d'
              onChange={this.onOptionInputChange}
              value={this.state.opt.d}
            />
          </Grid>

          <Grid item sm={12}>
            {this.state.preview ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img
                  src={this.state.preview}
                  style={{
                    marginRight: '15px',
                    maxHeight: '500px',
                    maxWidth: '500px'
                  }}
                  alt=''
                />
                <Button
                  style={{ color: '#fff' }}
                  variant='contained'
                  color='secondary'
                  component='span'
                  onClick={this.removeImage}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='raised-button-file'
                  type='file'
                  onChange={this.onChange}
                />
                <label htmlFor='raised-button-file'>
                  <Button
                    style={{ color: '#fff' }}
                    variant='contained'
                    color='primary'
                    component='span'
                  >
                    Upload
                  </Button>
                </label>
              </div>
            )}
          </Grid>
          <Grid item sm={12}>
            <TextField
              label='Explanation'
              placeholder='Explanation for the question'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              multiline
              name='exp'
              onChange={this.onInputChange}
              value={this.state.exp}
            />
          </Grid>
          <Grid item sm={12}>
            <PreviewCard {...{...this.state, answer: this.state.ans, options: this.state.opt}} />
          </Grid>
          <Grid item sm={6}>
            <Button
              variant='contained'
              onClick={this.props.close}
              style={styles.action}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item sm={6}>
            <Button
              style={{ ...styles.action, color: '#fff' }}
              variant='contained'
              color='primary'
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default compose(
  withApollo,
  graphql(ADD_QUESTION)
)(EditQuestion)