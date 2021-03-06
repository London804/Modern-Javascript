import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';


// ES5 Version
// function SelectLanguage (props) {
//   var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
//   return (
//     <ul className='languages'>
//       {languages.map(function (lang) {
//         return (
//           <li
//             style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
//             onClick={props.onSelect.bind(null, lang)}
//             key={lang}>
//               {lang}
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

function SelectLanguage ({selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang) => (
        <li
          style={lang === selectedLanguage ? {color: '#d0021b'} : null}
          onClick={() => onSelect(lang)}
          key={lang}>
            {lang}
        </li>
      ))}
    </ul>
  )
}

// ES5
// function RepoGrid (props) {
//   return (
//     <ul className='popular-list'>
//       {props.repos.map(function (repo, index) {
//         return (
//           <li key={repo.name} className='popular-item'>
//             <div className='popular-rank'>#{index + 1}</div>
//             <ul className='space-list-items'>
//               <li>
//                 <img
//                   className='avatar'
//                   src={repo.owner.avatar_url}
//                   alt={'Avatar for ' + repo.owner.login}
//                 />
//               </li>
//               <li><a href={repo.html_url}>{repo.name}</a></li>
//               <li>@{repo.owner.login}</li>
//               <li>{repo.stargazers_count} stars</li>
//             </ul>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, stargazers_count, owner, html_url }, index) => (
        <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={owner.avatar_url}
                alt={'Avatar for ' + owner.login}
              />
            </li>
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  // ES5 
  // updateLanguage(lang) {
  //   this.setState(function () {
  //      return {
  //       selectedLanguage: lang,
  //       repos: null 
  //     }
  //   });
  //   api.fetchPopularRepos(lang)
  //     .then(function (repos) {
  //       this.setState(function () {
  //         return {
  //           repos: repos
  //         }
  //       });
  //     }.bind(this));
  //   }


  // ES6 
  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));

    fetchPopularRepos(lang)
      .then((repos) => this.setState(() => ({repos}) ) );
  }

  // async example
  // updateLanguage = async (lang) {
  //   this.setState(() => ({
  //     selectedLanguage: lang,
  //     repos: null
  //   }));

  //   const repos = await fetchPopularRepos(lang)
  //     this.setState(() => ({repos}));
  // }
  render() {
    const { selectedLanguage, repos } = this.state

    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage} />
        {!repos
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

export default Popular;