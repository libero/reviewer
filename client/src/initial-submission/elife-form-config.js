module.exports = {
  "steps": [
    {
      // step name will be stored in translation file, key is customizable here
      "name_key": "wizard:author_step--label",
      "components": [
        {
          // Labels for input types are set in translation files not this config.
          "id": "author",
          "type": "ORCID_DETAILS",
          "options": {
            "exclude" : [],
            "validation": true
          }
        }
      ]
    },
    {
      "name_key": "wizard:files_step--label",
      "components": [
        {
          "id": "coverLetter",
          "type": "RICH_TEXT_EDITOR",
          "options": {
            "validation": true,
            // If present, gives the block of customizable text before the input block. This should be stored in a translation file.
            "pretext_key": 'coverletter_pretext'
          }
        },
        {
          "id": "manuscriptFile",
          "type": "MANUSCRIPT_UPLOAD",
          "options": {
            "validation": true,
            "supporting_files": {
              "id": "supportingFiles",
              "options": {
                // What should be configurable here? fileSize? 
              }
            }
            //What should be configurable here? fileSize? 
          }
        }
      ]
    },
    {
      "name_key": "wizard:details_step--label",
      "components": [
        {
          "id": "title",
          "type": "EXPANDING_INPUT",
          "options": {
            "validation": {
              // How are we doing this?
            }
          }
        },
        {
          "id": "articleType",
          "type": "SELECT_INPUT",
          "options": {
            // defaults
            //"searchable": false,
            //"multiple": false,
            "values": [
              { "label_key": "wizard:article_type--research-article", "value": "research_article" },
              { "label_key": "wizard:article_type--short-report", "value": "short_report" },
              { "label_key": "wizard:article_type--tools-resources", "value": "tools_resources" },
              { "label_key": "wizard:article_type--scientific-correspondence", "value": "scientific_correspondence" },
              { "label_key": "wizard:article_type--feature-article", "value": "feature_article" },
            ],
            "validation": {
              // How are we doing this?
            }
          }
        },
        {
          "id": "subjectAreas",
          "type": "SELECT_INPUT",
          "options": {
            "searchable": true,
            "multiple": true,
            "values": [
              { "label_key": "wizard:article_type--research-article", "value": "research_article" },
            ],
            "validation": {
              // How are we doing this?
            }
          }
        }
      ]
    }
  ]
}