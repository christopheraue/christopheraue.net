{% assign types = "mail twitter facebook github youtube patreon play pause" | split: " " %}
{% assign colors = "default white" | split: " " %}

# Parameters

## type
  [required] The type of icon to be rendered.
  
  *supported*: {{ types.join ", " }}
  
## color
  [optional] The color the icon is rendered in. By default, icons are rendered in their *natural* colors, i.e. in the case of a company logo it will be in the company's colors.
  
  *default*: {{ colors.first }}
  *supported*: {{ colors.join ", " }}


# Available Icons

{% for type in types %}
## {{type | capitalize }}

```
{% block icon type="{{ type }}" %}
```

```
{% block icon type="{{ type }}" color="white" %}
```
{% endfor %}  