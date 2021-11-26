import React, {useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getRepos } from '../../actions/profile'
import Spinner from '../layouts/Spinner'

const ProfileGithub = props => {
    console.log(props.username)
    useEffect(()=>{
        props.getRepos(props.username)
    },[])
    
    let r =[]
    if(props.repos!=null){
        if(props.repos.length > 0){
            r= props.repos
        }
    }
  
    return (
        <div className="profile-github">
                <h2 className="text-primary my-1">Github Repos</h2>
                {r.map(repo=>(
                        <div key={repo.id} className="repo bg-white p-1 my-1">
                            <div>
                                <h4>
                                    <a href={repo.html_url} target="_blank" rel="nonopener nonreferrer">{repo.full_name}</a>
                                </h4>
                            </div>
                        </div>
                ))}
               
            
        </div>
    )
}

ProfileGithub.propTypes = {

}

const mapStateToProps = state => ({
    repos :state.profile.repos
})
export default connect(mapStateToProps,{getRepos})(ProfileGithub)
